import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserLanding = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div style={styles.page}>
      {/* ================= HERO ================= */}
      <section
        style={{
          ...styles.hero,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.1) 100%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "100px 0 60px" : "160px 0 100px",
        }}>
        <div style={styles.container}>
          <div
            style={{
              ...styles.heroContent,
              textAlign: isMobile ? "center" : "left",
            }}>
            <div style={styles.badge}>🚀 Free Shipping on orders over $50</div>
            <h1 style={{ ...styles.heroTitle, fontSize: isMobile ? 42 : 72 }}>
              The Future of <br />{" "}
              <span style={styles.accentText}>Shopping</span> is Here.
            </h1>
            <p
              style={{
                ...styles.heroText,
                margin: isMobile ? "0 auto 30px" : "0 0 40px",
              }}>
              Shop from a curated selection of global brands. Experience
              lightning-fast delivery and world-class support.
            </p>
            <div
              style={{
                display: "flex",
                gap: 15,
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/products")}>
                Shop Now
              </button>
              {!isMobile && (
                <button style={styles.secondaryBtnOutline}>Learn More</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STATS ================= */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            {[
              { label: "Active Users", val: "2M+" },
              { label: "Premium Brands", val: "500+" },
              { label: "Global Stores", val: "120+" },
              { label: "Happy Customers", val: "99%" },
            ].map((stat) => (
              <div key={stat.label} style={styles.statCard}>
                <h2 style={styles.statVal}>{stat.val}</h2>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h3 style={styles.sectionTitleCenter}>Browse by Lifestyle</h3>
          <div style={styles.categoryGrid}>
            {["Electronics", "Beauty", "Groceries", "Home Decor"].map((cat) => (
              <div
                key={cat}
                style={styles.categoryCard}
                onClick={() => navigate("/products")}>
                <span style={{ fontSize: 32 }}>{getEmoji(cat)}</span>
                <h4 style={{ margin: "10px 0 0" }}>{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Featured Drops</h3>
            <button
              style={styles.textLink}
              onClick={() => navigate("/products")}>
              See All Products
            </button>
          </div>
          <div style={styles.productGrid}>
            {loading ?
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={styles.skeletonCard} />
              ))
            : products.map((item) => (
                // inside your .map((item) => ( ... ))
                <div
                  key={item.id}
                  style={styles.productCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  {/* IMAGE CONTAINER */}
                  <div style={styles.imageBox}>
                    <div style={styles.discountBadge}>
                      -{Math.round(item.discountPercentage || 10)}%
                    </div>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={styles.productImg}
                    />
                    <div style={styles.quickViewOverlay} className="view-btn">
                      <button
                        style={styles.viewBtn}
                        onClick={() => navigate(`/products/${item.id}`)}>
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div style={styles.productInfo}>
                    <div style={styles.categoryRow}>
                      <span style={styles.categoryLabel}>{item.category}</span>
                      <div style={styles.rating}>⭐ {item.rating || 4.5}</div>
                    </div>

                    <h4 style={styles.productTitle}>{item.title}</h4>

                    <div style={styles.cardFooter}>
                      <div style={styles.priceContainer}>
                        <span style={styles.originalPrice}>
                          ${Math.round(item.price * 1.2)}
                        </span>
                        <span style={styles.price}>${item.price}</span>
                      </div>

                      <button
                        style={styles.addBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${item.id}`);
                        }}>
                        <span style={{ fontSize: "18px" }}>+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

const getEmoji = (cat) => {
  const icons = {
    Electronics: "💻",
    Beauty: "✨",
    Groceries: "🍎",
    "Home Decor": "🏠",
  };
  return icons[cat] || "🛍️";
};

export default UserLanding;

/* ================= THEMED STYLES ================= */

const styles = {
  page: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#1a1a1a",
    background: "#fff",
  },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },

  // Navbar

  // Hero
  hero: { display: "flex", alignItems: "center" },
  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "#4338ca",
    color: "#fff",
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 20,
  },
  heroTitle: {
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 24,
    letterSpacing: "-0.04em",
  },
  accentText: { color: "#4338ca" },
  heroText: { fontSize: 19, color: "#4b5563", maxWidth: 550, lineHeight: 1.6 },
  primaryBtn: {
    padding: "18px 38px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
  secondaryBtnOutline: {
    padding: "18px 38px",
    background: "transparent",
    color: "#1a1a1a",
    border: "2px solid #1a1a1a",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },

  // Stats
  statsSection: { padding: "40px 0", borderBottom: "1px solid #eee" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 20,
    textAlign: "center",
  },
  statVal: { fontSize: 32, fontWeight: 800, margin: 0, color: "#4338ca" },
  statLabel: { fontSize: 14, color: "#6b7280", margin: "5px 0 0" },

  // Sections
  section: { padding: "100px 0" },
  sectionAlt: { padding: "100px 0", background: "#f9fafb" },
  sectionTitleCenter: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 50,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  sectionTitle: { fontSize: 28, fontWeight: 800, margin: 0 },
  textLink: {
    background: "none",
    border: "none",
    color: "#4338ca",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  },

  // Grids
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 24,
  },
  categoryCard: {
    padding: "40px",
    textAlign: "center",
    borderRadius: 24,
    background: "#fff",
    border: "1px solid #eee",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 32,
  },
  productCard: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "1px solid #f1f5f9",
    position: "relative",
    cursor: "pointer",
  },
  imageBox: {
    height: "240px",
    background: "#f8fafc", // Very light cool grey
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  productImg: {
    maxWidth: "85%",
    maxHeight: "85%",
    objectFit: "contain",
    transition: "transform 0.5s ease",
  },
  discountBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#ef4444",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "800",
    zIndex: 2,
  },
  productInfo: {
    padding: "20px",
  },
  categoryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  categoryLabel: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  rating: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#f59e0b",
  },
  productTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 16px 0",
    height: "44px",
    overflow: "hidden",
    lineHeight: "1.4",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
  },
  originalPrice: {
    fontSize: "12px",
    color: "#94a3b8",
    textDecoration: "line-through",
    marginBottom: "2px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1e293b",
  },
  addBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "none",
    background: "#4338ca",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(67, 56, 202, 0.2)",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
    cursor: "pointer",
    fontSize: 20,
  },
};
