import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

/* ================= STATUS THEMES ================= */
const statusStyles = {
  PLACED: { background: "#e0e7ff", color: "#4338ca", borderColor: "#c7d2fe" },
  CONFIRMED: {
    background: "#fef3c7",
    color: "#b45309",
    borderColor: "#fde68a",
  },
  SHIPPED: { background: "#e0f2fe", color: "#0369a1", borderColor: "#bae6fd" },
  DELIVERED: {
    background: "#dcfce7",
    color: "#15803d",
    borderColor: "#bbf7d0",
  },
  CANCELLED: {
    background: "#fee2e2",
    color: "#b91c1c",
    borderColor: "#fecaca",
  },
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [orders, setOrders] = useState(() => {
    const storedOrders = JSON.parse(localStorage.getItem("app_orders")) || [];
    return [...storedOrders].reverse();
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Clean up only the event listener here
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    // 1. Update local state for immediate UI feel
    const updatedDisplayOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order,
    );
    setOrders(updatedDisplayOrders);

    // 2. Sync back to localStorage (reverse back to keep original order if needed)
    const syncData = [...updatedDisplayOrders].reverse();
    localStorage.setItem("app_orders", JSON.stringify(syncData));
  };

  return (
    <div style={styles.page}>
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <div>
          <button style={styles.backBtn} onClick={() => navigate("/admin")}>
            ← Dashboard
          </button>
          <h2 style={styles.title}>Order Management</h2>
          <p style={styles.subTitle}>Track and update customer shipments</p>
        </div>
        {!isMobile && (
          <div style={styles.statsMini}>
            <strong>{orders.length}</strong> Total Orders
          </div>
        )}
      </div>

      {orders.length === 0 ?
        <div style={styles.emptyCard}>
          <div style={{ fontSize: "50px" }}>📦</div>
          <h3 style={{ margin: "10px 0" }}>No orders yet</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            When customers buy products, they will appear here.
          </p>
          <button style={styles.primaryBtn} onClick={() => navigate("/")}>
            Go to Store
          </button>
        </div>
      : <div style={styles.tableCard}>
          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order Details</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Payment</th>
                  <th style={styles.th}>Status Action</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} style={styles.row}>
                    <td style={styles.td}>
                      <span style={styles.orderId}>
                        #{order.orderId.slice(-6)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.userName}>{order.userName}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.amount}>
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.methodBadge}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.orderId, e.target.value)
                        }
                        style={{
                          ...styles.statusSelect,
                          ...statusStyles[order.status],
                        }}>
                        <option value="PLACED">Placed</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.dateText}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

/* ================= PREMIUM STYLES ================= */

const styles = {
  page: {
    padding: "40px 24px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#6366f1",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    marginBottom: "8px",
  },
  title: { fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 },
  subTitle: { color: "#64748b", margin: "4px 0 0", fontSize: "14px" },
  statsMini: {
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    color: "#475569",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  tableResponsive: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
  th: {
    textAlign: "left",
    padding: "16px 24px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#94a3b8",
    background: "#fafafa",
    textTransform: "uppercase",
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "18px 24px",
    borderBottom: "1px solid #f8fafc",
    verticalAlign: "middle",
  },
  row: { transition: "0.2s" },

  orderId: {
    fontWeight: 700,
    color: "#1e293b",
    fontFamily: "monospace",
    fontSize: "15px",
  },
  userName: { fontWeight: 600, color: "#475569", fontSize: "14px" },
  amount: { fontWeight: 800, color: "#1e293b" },
  methodBadge: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "6px",
  },

  statusSelect: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    outline: "none",
    appearance: "none", // Removes default arrow for cleaner look
    textAlign: "center",
  },

  dateText: { fontSize: "13px", color: "#94a3b8", fontWeight: 500 },

  emptyCard: {
    background: "#fff",
    padding: "60px",
    borderRadius: "24px",
    textAlign: "center",
    border: "1px solid #f1f5f9",
  },
  primaryBtn: {
    background: "#1e293b",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default AdminOrders;
