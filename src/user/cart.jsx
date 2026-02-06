import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../auth/store/cartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, totalAmount } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyContent}>
          <div style={styles.emptyIcon}>🛍️</div>
          <h2 style={styles.emptyTitle}>Your bag is empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven’t found anything you love yet. Explore our
            latest arrivals and find your next favorite piece.
          </p>
          <button
            style={styles.continueBtn}
            onClick={() => navigate("/products")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>
          Shopping Bag{" "}
          <span style={styles.itemCount}>({cart.length} items)</span>
        </h1>

        <div
          style={{
            ...styles.cartLayout,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
          }}>
          {/* LEFT: ITEMS LIST */}
          <div style={styles.itemsColumn}>
            {cart.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.imgWrapper}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={styles.image}
                  />
                </div>

                <div style={styles.itemInfo}>
                  <div style={styles.itemHeader}>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
                    <button
                      style={styles.removeIconBtn}
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item">
                      ✕
                    </button>
                  </div>
                  <p style={styles.categoryText}>{item.category}</p>

                  <div style={styles.itemFooter}>
                    <div style={styles.qtyContainer}>
                      <button
                        style={styles.qtyAction}
                        onClick={() => updateQty(item.id, item.qty - 1)}>
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.qty}</span>
                      <button
                        style={styles.qtyAction}
                        onClick={() => updateQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>
                    <div style={styles.priceContainer}>
                      <span style={styles.priceText}>
                        ${Math.round(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div style={styles.summarySticky}>
            <div style={styles.summaryCard}>
              <h4 style={styles.summaryTitle}>Order Summary</h4>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${Math.round(totalAmount)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>FREE</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Estimated Tax</span>
                <span>$0.00</span>
              </div>

              <div style={styles.divider} />

              <div style={styles.totalRow}>
                <span>Total</span>
                <span>${Math.round(totalAmount)}</span>
              </div>

              <button
                style={styles.checkoutBtn}
                onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>

              <div style={styles.trustBadge}>🔒 Secure SSL Checkout</div>
            </div>

            <button
              style={styles.backLink}
              onClick={() => navigate("/products")}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    paddingTop: "120px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "40px",
    color: "#1e293b",
  },
  itemCount: {
    fontSize: "18px",
    color: "#94a3b8",
    fontWeight: 500,
  },
  cartLayout: {
    display: "grid",
    gap: "40px",
    alignItems: "start",
  },

  /* ITEM CARDS */
  itemsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  itemCard: {
    background: "#fff",
    borderRadius: "24px",
    padding: "20px",
    display: "flex",
    gap: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f1f5f9",
  },
  imgWrapper: {
    width: "120px",
    height: "120px",
    background: "#f1f5f9",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    maxWidth: "80%",
    maxHeight: "80%",
    objectFit: "contain",
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: "18px",
    fontWeight: 700,
    margin: 0,
    color: "#1e293b",
  },
  removeIconBtn: {
    background: "none",
    border: "none",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "18px",
    transition: "color 0.2s",
    ":hover": { color: "#ef4444" },
  },
  categoryText: {
    fontSize: "13px",
    color: "#94a3b8",
    textTransform: "uppercase",
    fontWeight: 600,
    marginTop: "4px",
  },
  itemFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
  },
  qtyContainer: {
    display: "flex",
    alignItems: "center",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "4px",
    border: "1px solid #e2e8f0",
  },
  qtyAction: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#1e293b",
    fontWeight: 600,
  },
  qtyValue: {
    padding: "0 15px",
    fontWeight: 700,
    color: "#1e293b",
  },
  priceText: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#1e293b",
  },

  /* SUMMARY SECTION */
  summarySticky: {
    position: "sticky",
    top: "120px",
  },
  summaryCard: {
    background: "#fff",
    borderRadius: "28px",
    padding: "30px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f1f5f9",
  },
  summaryTitle: {
    fontSize: "20px",
    fontWeight: 800,
    marginBottom: "24px",
    color: "#1e293b",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    color: "#64748b",
    fontSize: "15px",
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "20px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: 800,
    color: "#1e293b",
    marginBottom: "30px",
  },
  checkoutBtn: {
    width: "100%",
    padding: "18px",
    background: "#4338ca",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(67, 56, 202, 0.3)",
    transition: "transform 0.2s",
  },
  trustBadge: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 600,
  },
  backLink: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    background: "none",
    border: "none",
    color: "#64748b",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
  },

  /* EMPTY STATE */
  emptyContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: "24px",
  },
  emptyContent: {
    textAlign: "center",
    maxWidth: "400px",
  },
  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },
  emptyTitle: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#1e293b",
    marginBottom: "12px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  continueBtn: {
    padding: "16px 32px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Cart;
