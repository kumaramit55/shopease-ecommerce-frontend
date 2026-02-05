import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserLanding = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-shoes?limit=8&skip=0")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}

      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          {/* LEFT CONTENT */}
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              Discover Premium <span style={{ color: "#ffd700" }}>Shoes</span>
            </h1>
            <p style={styles.heroText}>
              Style, comfort and performance — all in one place.
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/products")}>
              Explore Collection
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div style={styles.heroRight}></div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h3 style={styles.sectionTitle}>Shop by Category</h3>
          <div style={styles.categoryGrid}>
            {["Running", "Casual", "Sports", "Lifestyle"].map((cat) => (
              <div
                key={cat}
                style={styles.categoryCard}
                onClick={() => navigate("/products")}>
                <h4>{cat}</h4>
                <p>View collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h3 style={styles.sectionTitle}>Trending Shoes</h3>

          <div style={styles.productGrid}>
            {loading ?
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={styles.skeletonCard} />
              ))
            : products.map((item) => (
                <div key={item.id} style={styles.productCard}>
                  <div style={styles.imageBox}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={styles.productImg}
                    />
                  </div>

                  <h4 style={styles.productTitle}>{item.title.slice(0, 32)}</h4>
                  <p style={styles.price}>₹ {Math.round(item.price * 80)}</p>

                  <button
                    style={styles.secondaryBtn}
                    onClick={() => navigate(`/products/${item.id}`)}>
                    View Details
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h3 style={styles.sectionTitle}>Why Choose ShopEase</h3>
          <div style={styles.trustGrid}>
            {[
              { title: "Fast Delivery", desc: "Quick & reliable shipping" },
              { title: "Secure Payments", desc: "100% protected checkout" },
              { title: "Quality Products", desc: "Top rated brands only" },
            ].map((item) => (
              <div key={item.title} style={styles.trustCard}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLanding;

/* ================= STYLES ================= */

const styles = {
  /* ===== PAGE ===== */
  page: {
    fontFamily: "'Inter', system-ui, sans-serif",
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    minHeight: "100vh",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px",
  },

  /* ===== HERO ===== */
  hero: {
    background: "linear-gradient(135deg, #1d2671, #4e54c8)",
    color: "#fff",
    padding: "90px 0",
  },

  heroContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  },

  heroLeft: {
    flex: 1,
    minWidth: 280,
  },

  heroTitle: {
    fontSize: 42,
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: 16,
  },

  heroText: {
    fontSize: 17,
    opacity: 0.95,
    marginBottom: 28,
    maxWidth: 480,
  },

  heroRight: {
    flex: 1,
    minWidth: 280,
    display: "flex",
    justifyContent: "center",
  },

  heroImage: {
    maxWidth: 440,
    width: "100%",
    transform: "rotate(-10deg)",
    filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.4))",
  },

  primaryBtn: {
    padding: "14px 30px",
    background: "#ffd700",
    color: "#000",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(255,215,0,0.4)",
  },

  /* ===== SECTIONS ===== */
  section: { padding: "70px 0" },
  sectionAlt: { padding: "70px 0", background: "#fff" },

  sectionTitle: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
  },

  /* ===== CATEGORIES ===== */
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },

  categoryCard: {
    background: "#fff",
    padding: 36,
    borderRadius: 18,
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
    fontWeight: 600,
  },

  /* ===== PRODUCTS ===== */
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 28,
  },

  productCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 18,
    textAlign: "center",
    boxShadow: "0 14px 28px rgba(0,0,0,0.1)",
  },

  imageBox: {
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  productImg: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
  },

  productTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
  },

  price: {
    fontWeight: 700,
    margin: "8px 0",
    color: "#1d2671",
  },

  secondaryBtn: {
    padding: "10px 18px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },

  skeletonCard: {
    height: 340,
    background: "#e5e7eb",
    borderRadius: 18,
  },

  /* ===== TRUST ===== */
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 28,
  },

  trustCard: {
    background: "#fff",
    padding: 36,
    borderRadius: 18,
    textAlign: "center",
    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
  },

  /* ===== FOOTER ===== */
  footer: {
    background: "#111827",
    color: "#9ca3af",
    padding: 24,
    textAlign: "center",
    fontSize: 14,
  },
};
