import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useProducts from "../products/useProducts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  const adminName = "Admin"; // later auth se aayega

  /* ================= LOAD DASHBOARD STATS ================= */
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("app_orders")) || [];

    const pendingOrders = orders.filter(
      (order) => order.status !== "DELIVERED" && order.status !== "CANCELLED",
    );

    const revenue = orders
      .filter((order) => order.status === "DELIVERED")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: pendingOrders.length,
      revenue,
    });
  }, [products]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h2>Admin Dashboard</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* CONTENT */}
      <div style={styles.container}>
        <h3 style={styles.welcome}>Welcome back, {adminName} 👋</h3>

        {/* STATS */}
        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate("/admin/products")}>
            <p style={styles.cardTitle}>Total Products</p>
            <h2 style={styles.cardValue}>{stats.totalProducts}</h2>
            <span style={styles.viewText}>View details →</span>
          </div>

          <div style={styles.card} onClick={() => navigate("/admin/orders")}>
            <p style={styles.cardTitle}>Total Orders</p>
            <h2 style={styles.cardValue}>{stats.totalOrders}</h2>
            <span style={styles.viewText}>View details →</span>
          </div>

          <div style={styles.card} onClick={() => navigate("/admin/orders")}>
            <p style={styles.cardTitle}>Pending Orders</p>
            <h2 style={styles.cardValue}>{stats.pendingOrders}</h2>
            <span style={styles.viewText}>View details →</span>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Revenue</p>
            <h2 style={styles.cardValue}>₹ {stats.revenue.toFixed(2)}</h2>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={styles.quickActions}>
          <h4>Quick Actions</h4>

          <div style={styles.actionsRow}>
            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/products/add")}>
              Add Product
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/admin/orders")}>
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    fontFamily: "system-ui, sans-serif",
  },

  header: {
    height: 64,
    background: "#111",
    color: "#fff",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutBtn: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 24,
  },

  welcome: {
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  cardTitle: {
    color: "#555",
    marginBottom: 6,
  },

  cardValue: {
    margin: 0,
  },

  viewText: {
    marginTop: 10,
    display: "inline-block",
    color: "#1d2671",
    fontWeight: 600,
    fontSize: 13,
  },

  quickActions: {
    marginTop: 40,
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  actionsRow: {
    marginTop: 16,
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },

  actionBtn: {
    padding: "10px 20px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
