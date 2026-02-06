import { useNavigate, useLocation } from "react-router";
import { useCart } from "../auth/store/cartContext";
import { useState, useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, totalAmount, clearCart } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buyNowItem = location.state?.buyNowItem;
  const checkoutItems = buyNowItem ? [buyNowItem] : cart;
  const checkoutTotal =
    buyNowItem ? buyNowItem.price * buyNowItem.qty : totalAmount;

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.address || !form.city || !form.pincode) {
      alert("Please fill all shipping details to proceed.");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("app_orders")) || [];
    const newOrder = {
      orderId: "ORD_" + Date.now(),
      userName: form.name,
      items: checkoutItems,
      shippingAddress: { ...form },
      totalAmount: checkoutTotal,
      paymentMethod: form.payment,
      status: "PLACED",
      createdAt: new Date().toLocaleString(),
    };

    existingOrders.push(newOrder);
    localStorage.setItem("app_orders", JSON.stringify(existingOrders));

    if (!buyNowItem) clearCart();

    navigate("/order-success", { state: { orderId: newOrder.orderId } });
  };

  if (checkoutItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2 style={styles.emptyTitle}>Your bag is empty</h2>
        <p style={styles.emptyText}>
          Add some items to your bag to proceed with checkout.
        </p>
        <button
          style={styles.continueBtn}
          onClick={() => navigate("/products")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>Secure Checkout</h2>
          <p style={styles.subtitle}>
            Finalize your order and choose your preferred delivery address
          </p>
        </div>

        <div
          style={{
            ...styles.layout,
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
          }}>
          {/* LEFT: SHIPPING DETAILS */}
          <div style={styles.formCard}>
            <h3 style={styles.cardHeading}>Shipping Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="name"
                  placeholder="e.g. John Doe"
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Detailed Address</label>
                <textarea
                  name="address"
                  placeholder="Street, Apartment, Suite..."
                  style={styles.textarea}
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.row}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>City</label>
                  <input
                    name="city"
                    placeholder="City"
                    style={styles.input}
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Pincode</label>
                  <input
                    name="pincode"
                    placeholder="6-digit code"
                    style={styles.input}
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <h3 style={{ ...styles.cardHeading, marginTop: "40px" }}>
              Payment Method
            </h3>
            <div style={styles.paymentGrid}>
              {["COD", "CARD", "UPI"].map((method) => (
                <div
                  key={method}
                  onClick={() => setForm({ ...form, payment: method })}
                  style={{
                    ...styles.paymentOption,
                    borderColor:
                      form.payment === method ? "#4338ca" : "#e2e8f0",
                    background: form.payment === method ? "#f5f3ff" : "#fff",
                  }}>
                  <div
                    style={{
                      ...styles.radio,
                      borderColor:
                        form.payment === method ? "#4338ca" : "#cbd5e1",
                    }}>
                    {form.payment === method && (
                      <div style={styles.radioInner} />
                    )}
                  </div>
                  <span style={styles.paymentText}>
                    {method === "COD" ?
                      "Cash on Delivery"
                    : method === "CARD" ?
                      "Card Payment"
                    : "UPI Payment"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div style={styles.summaryContainer}>
            <div style={styles.summaryCard}>
              <h3 style={styles.cardHeading}>Order Summary</h3>
              <div style={styles.itemsList}>
                {checkoutItems.map((item) => (
                  <div key={item.id} style={styles.summaryItem}>
                    <div style={styles.itemMeta}>
                      <span style={styles.itemTitle}>{item.title}</span>
                      <span style={styles.itemQty}>Qty: {item.qty}</span>
                    </div>
                    <span style={styles.itemPrice}>
                      ${Math.round(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.divider} />

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${Math.round(checkoutTotal)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>FREE</span>
              </div>

              <div style={styles.totalRow}>
                <span>Total Amount</span>
                <span>${Math.round(checkoutTotal)}</span>
              </div>

              <button style={styles.placeOrderBtn} onClick={placeOrder}>
                Complete Purchase
              </button>

              <p style={styles.secureText}>
                🔒 All transactions are encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= THEMED STYLES ================= */

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    paddingTop: "120px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" },
  header: { marginBottom: "40px" },
  pageTitle: { fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 },
  subtitle: { color: "#64748b", marginTop: "8px" },
  layout: { display: "grid", gap: "40px", alignItems: "start" },

  /* FORMS */
  formCard: {
    background: "#fff",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  cardHeading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "20px",
  },
  formGrid: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: 700, color: "#64748b" },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },
  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    minHeight: "80px",
    outline: "none",
    fontFamily: "inherit",
  },
  row: { display: "flex", gap: "16px" },

  /* PAYMENT */
  paymentGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    borderRadius: "14px",
    border: "2px solid",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  radio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4338ca",
  },
  paymentText: { fontWeight: 600, fontSize: "15px", color: "#1e293b" },

  /* SUMMARY */
  summaryContainer: { position: "sticky", top: "120px" },
  summaryCard: {
    background: "#fff",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemMeta: { display: "flex", flexDirection: "column" },
  itemTitle: { fontSize: "14px", fontWeight: 600, color: "#1e293b" },
  itemQty: { fontSize: "12px", color: "#94a3b8" },
  itemPrice: { fontWeight: 700, color: "#1e293b" },
  divider: { height: "1px", background: "#f1f5f9", margin: "20px 0" },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#64748b",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: 800,
    color: "#1e293b",
    marginTop: "16px",
  },
  placeOrderBtn: {
    width: "100%",
    padding: "18px",
    background: "#4338ca",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "30px",
    boxShadow: "0 10px 15px -3px rgba(67, 56, 202, 0.3)",
  },
  secureText: {
    textAlign: "center",
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "16px",
    fontWeight: 600,
  },

  /* EMPTY STATE */
  emptyContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: "24px",
    textAlign: "center",
  },
  emptyTitle: { fontSize: "28px", fontWeight: 800, color: "#1e293b" },
  emptyText: { color: "#64748b", margin: "12px 0 24px" },
  continueBtn: {
    padding: "14px 28px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default Checkout;
