import { useNavigate } from "react-router";
import { useCart } from "../auth/store/cartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>🛒</div>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>
          Looks like you haven’t added anything yet. Start shopping to see items
          here.
        </p>
        <button style={styles.primaryBtn} onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.container}>
        <h3 style={styles.pageTitle}>Shopping Cart</h3>

        <div style={styles.cartLayout}>
          {/* LEFT : ITEMS */}
          <div style={styles.items}>
            {cart.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={styles.image}
                />

                <div style={styles.itemInfo}>
                  <h4 style={styles.itemTitle}>{item.title}</h4>
                  <p style={styles.price}>₹ {Math.round(item.price * 80)}</p>

                  <div style={styles.qtyRow}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQty(item.id, item.qty - 1)}>
                      −
                    </button>
                    <span style={styles.qty}>{item.qty}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT : SUMMARY */}
          <div style={styles.summaryCard}>
            <h4>Order Summary</h4>

            <div style={styles.summaryRow}>
              <span>Items ({cart.length})</span>
              <span>₹ {Math.round(totalAmount * 80)}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <hr />

            <div style={styles.summaryTotal}>
              <span>Total Amount</span>
              <span>₹ {Math.round(totalAmount * 80)}</span>
            </div>

            <button
              style={styles.checkoutBtn}
              onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

/* ================= STYLES ================= */

const styles = {
  /* ===== PAGE ===== */
  page: {
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "28px 20px",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 24,
    color: "#111827",
  },

  /* ===== LAYOUT ===== */
  cartLayout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 28,
  },

  /* ===== LEFT : CART ITEMS ===== */
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  itemCard: {
    background: "#fff",
    padding: 18,
    borderRadius: 16,
    display: "flex",
    gap: 18,
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
  },

  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
    background: "#f9fafb",
    borderRadius: 12,
    padding: 6,
  },

  itemInfo: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 6,
    color: "#111827",
  },

  price: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1d2671",
    marginBottom: 12,
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 600,
  },

  qty: {
    fontWeight: 700,
    minWidth: 20,
    textAlign: "center",
  },

  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },

  /* ===== RIGHT : SUMMARY ===== */
  summaryCard: {
    background: "#fff",
    padding: 24,
    borderRadius: 18,
    height: "fit-content",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 20,
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "12px 0",
    fontSize: 14,
    color: "#374151",
  },

  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 800,
    fontSize: 16,
    margin: "18px 0",
    color: "#111827",
  },

  checkoutBtn: {
    width: "100%",
    padding: "14px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 12px 20px rgba(29,38,113,0.35)",
  },

  /* ===== EMPTY CART (MOST IMPORTANT) ===== */
  empty: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    textAlign: "center",
    gap: 14,
    padding: 20,
  },

  emptyIcon: {
    fontSize: 70,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: 15,
    maxWidth: 300,
  },

  primaryBtn: {
    marginTop: 10,
    padding: "12px 26px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 10px 20px rgba(29,38,113,0.3)",
  },
};
