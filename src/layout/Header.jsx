import { NavLink, useNavigate } from "react-router";
import { useCart } from "../auth/store/cartContext"; // adjust path

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header style={styles.header}>
      {/* LOGO */}
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        ShopEase
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
          to="/cart"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
          🛒 Cart
          {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
        </NavLink>

        <NavLink
          to="/my-orders"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
          My Orders
        </NavLink>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;

/* ================= STYLES ================= */

const styles = {
  header: {
    height: 60,
    background: "#111",
    color: "#fff",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    cursor: "pointer",
    margin: 0,
    fontWeight: 700,
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    position: "relative",
  },

  activeLink: {
    color: "#ffd166",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
  },

  cartBadge: {
    background: "#e63946",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: 11,
    marginLeft: 6,
  },

  logoutBtn: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};
