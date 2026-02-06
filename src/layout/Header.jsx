import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useCart } from "../auth/store/cartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Handle scroll effect for a modern feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header
      style={{
        ...styles.header,
        backgroundColor:
          scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid #eee" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
      }}>
      {/* LOGO */}
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        Shop<span style={{ color: "#4338ca" }}>Ease</span>
      </h2>

      {/* NAV */}
      <nav style={styles.nav}>
        <NavLink
          to="/products"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
          Products
        </NavLink>

        <NavLink
          to="/my-orders"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
          Orders
        </NavLink>

        <NavLink
          to="/cart"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
          <div style={styles.cartWrapper}>
            🛒
            {totalItems > 0 && (
              <span style={styles.cartBadge}>{totalItems}</span>
            )}
          </div>
        </NavLink>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

/* ================= POLISHED STYLES ================= */

const styles = {
  header: {
    height: 70, // Slightly taller for more breathing room
    position: "fixed", // Keeps it sticky across all pages
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
  },

  logo: {
    cursor: "pointer",
    margin: 0,
    fontWeight: 800,
    fontSize: 24,
    letterSpacing: "-0.5px",
    color: "#1a1a1a",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "30px", // More space between links
  },

  link: {
    color: "#4b5563",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    transition: "color 0.2s",
  },

  activeLink: {
    color: "#4338ca",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
  },

  cartWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  },

  cartBadge: {
    position: "absolute",
    top: -8,
    right: -10,
    background: "#4338ca",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
    border: "2px solid #fff",
  },

  logoutBtn: {
    background: "#fee2e2",
    color: "#ef4444",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14px",
    transition: "all 0.2s",
  },
};

export default Header;
