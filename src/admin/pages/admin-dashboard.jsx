import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useProducts from "../products/useProducts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  const adminName = "Admin";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener("resize", handleResize);

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

    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // Better than clear() which wipes product data
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR - Desktop Only */}
      {!isMobile && (
        <aside style={styles.sidebar}>
          <div style={styles.sidebarBrand}>
            ShopEase <span>Pro</span>
          </div>
          <nav style={styles.sidebarNav}>
            <div style={styles.activeNavItem}>🏠 Dashboard</div>
            <div
              style={styles.navItem}
              onClick={() => navigate("/admin/products")}>
              📦 Products
            </div>
            <div
              style={styles.navItem}
              onClick={() => navigate("/admin/orders")}>
              🛒 Orders
            </div>
            <div style={styles.navItem}>📊 Analytics</div>
            <div style={styles.navItem}>⚙️ Settings</div>
          </nav>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main style={{ ...styles.main, marginLeft: isMobile ? 0 : "260px" }}>
        {/* TOP BAR */}
        <header style={styles.topBar}>
          <div>
            <h2 style={styles.pageTitle}>Dashboard Overview</h2>
            <p style={styles.dateText}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div style={styles.profileArea}>
            <div style={styles.avatar}>{adminName[0]}</div>
            <span>{adminName}</span>
          </div>
        </header>

        <div style={styles.contentContainer}>
          <h3 style={styles.welcomeText}>Welcome back, {adminName} 👋</h3>

          {/* STATS GRID */}
          <div style={styles.grid}>
            <StatCard
              label="Products"
              value={stats.totalProducts}
              icon="🏷️"
              color="#4338ca"
              onClick={() => navigate("/admin/products")}
            />
            <StatCard
              label="Total Orders"
              value={stats.totalOrders}
              icon="🛍️"
              color="#10b981"
              onClick={() => navigate("/admin/orders")}
            />
            <StatCard
              label="Pending"
              value={stats.pendingOrders}
              icon="⏳"
              color="#f59e0b"
              onClick={() => navigate("/admin/orders")}
            />
            <StatCard
              label="Revenue"
              value={`₹${Math.round(stats.revenue)}`}
              icon="💰"
              color="#6366f1"
            />
          </div>

          {/* QUICK ACTIONS SECTION */}
          <section style={styles.actionsCard}>
            <h4 style={styles.sectionTitle}>Management Shortcuts</h4>
            <div style={styles.actionsRow}>
              <button
                style={styles.primaryAction}
                onClick={() => navigate("/admin/products/add")}>
                ➕ Add New Product
              </button>
              <button
                style={styles.secondaryAction}
                onClick={() => navigate("/admin/orders")}>
                📋 Process Orders
              </button>
              <button style={styles.secondaryAction}>
                📩 Customer Support
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* REUSABLE STAT CARD COMPONENT */
const StatCard = ({ label, value, icon, color, onClick }) => (
  <div
    style={{ ...styles.card, cursor: onClick ? "pointer" : "default" }}
    onClick={onClick}
    onMouseEnter={(e) =>
      onClick && (e.currentTarget.style.transform = "translateY(-5px)")
    }
    onMouseLeave={(e) =>
      onClick && (e.currentTarget.style.transform = "translateY(0)")
    }>
    <div
      style={{ ...styles.iconCircle, background: `${color}15`, color: color }}>
      {icon}
    </div>
    <div style={styles.cardContent}>
      <p style={styles.cardLabel}>{label}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  </div>
);

/* ================= THEMED ADMIN STYLES ================= */

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  /* SIDEBAR */
  sidebar: {
    width: "260px",
    background: "#1e293b",
    color: "#fff",
    position: "fixed",
    top: 0,
    bottom: 0,
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarBrand: {
    fontSize: "22px",
    fontWeight: 800,
    marginBottom: "40px",
    paddingLeft: "10px",
  },
  sidebarNav: { flex: 1, display: "flex", flexDirection: "column", gap: "8px" },
  navItem: {
    padding: "12px 16px",
    borderRadius: "12px",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "0.2s",
    fontWeight: 600,
  },
  activeNavItem: {
    padding: "12px 16px",
    borderRadius: "12px",
    background: "#334155",
    color: "#fff",
    fontWeight: 700,
  },
  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },

  /* MAIN CONTENT */
  main: { flex: 1, transition: "margin 0.3s" },
  topBar: {
    height: "80px",
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: { fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 },
  dateText: { fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" },
  profileArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 700,
    color: "#334155",
  },
  avatar: {
    width: "36px",
    height: "36px",
    background: "#4338ca",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: { padding: "40px" },
  welcomeText: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#1e293b",
    marginBottom: "32px",
  },

  /* STATS */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "24px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },
  iconCircle: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  cardLabel: { fontSize: "14px", fontWeight: 700, color: "#64748b", margin: 0 },
  cardValue: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#1e293b",
    margin: "4px 0 0",
  },

  /* QUICK ACTIONS */
  actionsCard: {
    marginTop: "40px",
    background: "#fff",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#1e293b",
    marginBottom: "20px",
  },
  actionsRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
  primaryAction: {
    padding: "14px 28px",
    background: "#4338ca",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(67, 56, 202, 0.3)",
  },
  secondaryAction: {
    padding: "14px 28px",
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default AdminDashboard;
