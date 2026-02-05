import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // 🔐 Logged-in user (temporary, auth se aayega)
  const loggedInUserId = "USR_101";

  const loadOrders = () => {
    try {
      const data = localStorage.getItem("app_orders");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Invalid orders data", err);
      return [];
    }
  };
  useEffect(() => {
    const fetchOrders = () => {
      const allOrders = loadOrders();

      const myOrders = allOrders
        .filter((order) => order.userId === loggedInUserId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(myOrders);
    };

    fetchOrders();

    // 🔄 Listen to changes from other tabs/hooks
    window.addEventListener("storage", fetchOrders);

    return () => {
      window.removeEventListener("storage", fetchOrders);
    };
  }, [loggedInUserId]);

  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>📦</div>
        <h2 style={styles.emptyTitle}>No orders yet</h2>
        <p style={styles.emptyText}>
          You haven’t placed any orders yet. Start shopping and your orders will
          appear here.
        </p>
        <button style={styles.primaryBtn} onClick={() => navigate("/products")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Orders</h2>

      {orders.map((order) => (
        <div key={order.orderId} style={styles.card}>
          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <strong>Order ID:</strong> {order.orderId}
              <div style={styles.date}>{order.createdAt}</div>
            </div>

            <span style={styles.status}>{order.status}</span>
          </div>

          {/* ITEMS */}
          <div style={styles.items}>
            {order.items.map((item) => (
              <div key={item.productId} style={styles.itemRow}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.image} />
                )}

                <div style={{ flex: 1 }}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.muted}>Qty: {item.qty}</div>
                </div>

                <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={styles.footer}>
            <span>Payment: {order.paymentMethod}</span>
            <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

const styles = {
  /* ===== PAGE ===== */
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "32px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
  },

  title: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 24,
    color: "#111827",
  },

  /* ===== ORDER CARD ===== */
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
    boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  date: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  status: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    height: "fit-content",
  },

  /* ===== ITEMS ===== */
  items: {
    borderTop: "1px solid #e5e7eb",
    marginTop: 12,
    paddingTop: 6,
  },

  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb",
  },

  image: {
    width: 64,
    height: 64,
    objectFit: "contain",
    borderRadius: 12,
    background: "#f9fafb",
    padding: 6,
  },

  itemName: {
    fontWeight: 600,
    fontSize: 14,
    color: "#111827",
  },

  muted: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },

  price: {
    fontWeight: 700,
    color: "#1d2671",
    fontSize: 14,
  },

  /* ===== FOOTER ===== */
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTop: "1px solid #e5e7eb",
    fontWeight: 700,
    color: "#111827",
  },

  /* ===== EMPTY STATE (IMPORTANT) ===== */
  empty: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    textAlign: "center",
    padding: 20,
  },

  emptyIcon: {
    fontSize: 72,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
  },

  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    maxWidth: 320,
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
