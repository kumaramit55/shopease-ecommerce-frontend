import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  // Redirect if someone tries to access this page directly without an order
  useEffect(() => {
    if (!location.state?.orderId) {
      const timer = setTimeout(() => navigate("/products"), 5000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* SUCCESS ICON ANIMATION */}
        <div style={styles.iconContainer}>
          <div style={styles.checkCircle}>✓</div>
        </div>

        <h2 style={styles.title}>Order Confirmed!</h2>
        <p style={styles.text}>
          Thank you for your purchase. We've received your order and are getting
          it ready for shipment.
        </p>

        {/* ORDER INFO BOX */}
        <div style={styles.orderInfo}>
          <span style={styles.orderLabel}>Order ID</span>
          <span style={styles.orderValue}>{orderId}</span>
        </div>

        <div style={styles.divider} />

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

        <p style={styles.footerNote}>
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
};

/* ================= THEMED STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "60px 40px",
    borderRadius: "32px",
    textAlign: "center",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #f1f5f9",
    animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  iconContainer: {
    width: "80px",
    height: "80px",
    background: "#dcfce7",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
  },

  checkCircle: {
    fontSize: "40px",
    color: "#10b981",
    fontWeight: "bold",
  },

  title: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#1e293b",
    margin: "0 0 12px 0",
  },

  text: {
    fontSize: "16px",
    color: "#64748b",
    lineHeight: "1.6",
    margin: "0 0 32px 0",
  },

  orderInfo: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    border: "1px dashed #e2e8f0",
  },

  orderLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
  },

  orderValue: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#4338ca",
  },

  divider: {
    height: "1px",
    background: "#f1f5f9",
    marginBottom: "32px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexDirection: "column",
  },

  primaryBtn: {
    padding: "16px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },

  secondaryBtn: {
    padding: "16px",
    background: "#fff",
    color: "#1e293b",
    border: "2px solid #f1f5f9",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  },

  footerNote: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#94a3b8",
  },
};

export default OrderSuccess;
