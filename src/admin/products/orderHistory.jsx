import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

/* ================= STATUS STYLES ================= */
const statusStyles = {
  PLACED: {
    background: "#e0e7ff",
    color: "#1d4ed8",
    borderColor: "#c7d2fe",
  },
  CONFIRMED: {
    background: "#fff7ed",
    color: "#c2410c",
    borderColor: "#fed7aa",
  },
  SHIPPED: {
    background: "#ecfeff",
    color: "#0f766e",
    borderColor: "#99f6e4",
  },
  DELIVERED: {
    background: "#ecfdf5",
    color: "#047857",
    borderColor: "#a7f3d0",
  },
  CANCELLED: {
    background: "#fee2e2",
    color: "#b91c1c",
    borderColor: "#fecaca",
  },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("app_orders")) || [];
    setOrders(storedOrders.reverse());
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order,
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      "app_orders",
      JSON.stringify(updatedOrders.slice().reverse()),
    );
  };

  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>No Orders Found</h2>
        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
      </div>

      <h2 style={styles.title}>All Orders</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                style={styles.row}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fafbff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }>
                <td style={styles.td}>{order.orderId}</td>
                <td style={styles.td}>{order.userName}</td>
                <td style={styles.td}>₹{order.totalAmount.toFixed(2)}</td>
                <td style={styles.td}>{order.paymentMethod}</td>

                <td style={styles.td}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.orderId, e.target.value)
                    }
                    style={{
                      ...styles.select,
                      ...statusStyles[order.status],
                    }}>
                    <option value="PLACED">Placed</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>

                <td style={styles.td}>{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 24,
    background: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
  },

  topBar: {
    marginBottom: 12,
  },

  backBtn: {
    background: "transparent",
    border: "none",
    color: "#1d2671",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  title: {
    marginBottom: 20,
    fontWeight: 700,
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "14px 16px",
    background: "#f8f9fb",
    textAlign: "left",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
  },

  td: {
    padding: "14px 16px",
    borderTop: "1px solid #eee",
    fontSize: 14,
  },

  row: {
    transition: "background 0.2s",
  },

  select: {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    outline: "none",
  },

  empty: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    background: "#f4f6f8",
  },
};
