import { useNavigate } from "react-router";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* SUCCESS ICON */}
        <div style={styles.icon}>✅</div>

        <h2 style={styles.title}>Order Placed Successfully!</h2>
        <p style={styles.text}>
          Thank you for shopping with <b>ShopEase</b>. Your order has been
          confirmed and will be delivered soon.
        </p>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/products")}>
            Continue Shopping
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "48px 36px",
    borderRadius: 20,
    textAlign: "center",
    maxWidth: 440,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  icon: {
    fontSize: 64,
    marginBottom: 18,
  },

  title: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: 700,
    color: "#1d2671",
  },

  text: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 30,
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "12px 26px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 10px 20px rgba(29,38,113,0.35)",
  },

  secondaryBtn: {
    padding: "12px 26px",
    background: "#fff",
    color: "#1d2671",
    border: "2px solid #1d2671",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
  },
};
