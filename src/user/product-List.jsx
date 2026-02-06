import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LIMIT = 12;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using the search endpoint if search exists, otherwise regular list
        const url =
          search ?
            `https://dummyjson.com/products/search?q=${search}&limit=${LIMIT}&skip=${page * LIMIT}`
          : `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 400); // Prevents rapid API calls
    return () => clearTimeout(debounce);
  }, [page, search]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER & SEARCH SECTION */}
        <div style={styles.headerRow}>
          <div>
            <h2 style={styles.heading}>Explore Collection</h2>
            <p style={styles.subheading}>
              Discover the latest trends in our global marketplace
            </p>
          </div>

          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              style={styles.searchField}
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // Reset to first page on new search
              }}
            />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div style={styles.grid}>
          {loading ?
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={styles.skeletonCard} />
            ))
          : products.length > 0 ?
            products.map((item) => (
              <div
                key={item.id}
                style={styles.premiumCard}
                onClick={() => navigate(`/products/${item.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                {/* IMAGE AREA */}
                <div style={styles.imageContainer}>
                  {item.discountPercentage > 0 && (
                    <div style={styles.discountBadge}>
                      -{Math.round(item.discountPercentage)}%
                    </div>
                  )}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={styles.img}
                  />
                </div>

                {/* INFO AREA */}
                <div style={styles.cardInfo}>
                  <div style={styles.categoryRow}>
                    <span style={styles.categoryLabel}>{item.category}</span>
                    <span style={styles.rating}>⭐ {item.rating}</span>
                  </div>

                  <h4 style={styles.productTitle}>{item.title}</h4>

                  <div style={styles.priceRow}>
                    <div style={styles.priceColumn}>
                      <span style={styles.priceTag}>${item.price}</span>
                      <span style={styles.oldPrice}>
                        ${Math.round(item.price * 1.15)}
                      </span>
                    </div>
                    <button
                      style={styles.addBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${item.id}`);
                        // Add to cart logic here
                      }}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          : <div style={styles.emptyState}>
              <h3>No items found for "{search}"</h3>
              <p>Try checking your spelling or using different keywords.</p>
              <button style={styles.resetBtn} onClick={() => setSearch("")}>
                Show All Products
              </button>
            </div>
          }
        </div>

        {/* PAGINATION */}
        {products.length > 0 && (
          <div style={styles.pagination}>
            <button
              style={{ ...styles.pageBtn, opacity: page === 0 ? 0.5 : 1 }}
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}>
              ← Previous
            </button>

            <div style={styles.pageIndicator}>{page + 1}</div>

            <button
              style={styles.pageBtn}
              onClick={() => setPage((p) => p + 1)}>
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= THEMED STYLES ================= */

const styles = {
  page: {
    background: "#fcfcfd",
    minHeight: "100vh",
    paddingTop: "120px", // Increased for fixed header
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: {
    maxWidth: 1250,
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "50px",
    flexWrap: "wrap",
    gap: "24px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: 800,
    margin: "0 0 6px 0",
    color: "#1a1a1a",
  },
  subheading: { fontSize: "15px", color: "#64748b", margin: 0 },

  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: { position: "absolute", left: "16px", color: "#94a3b8" },
  searchField: {
    padding: "14px 16px 14px 48px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    width: "350px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "32px",
  },

  /* PREMIUM CARD */
  premiumCard: {
    background: "#fff",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    position: "relative",
  },
  imageContainer: {
    height: "250px",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "20px",
  },
  img: { maxWidth: "85%", maxHeight: "85%", objectFit: "contain" },
  discountBadge: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "#ef4444",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "800",
    zIndex: 2,
  },
  cardInfo: { padding: "24px" },
  categoryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  categoryLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  rating: { fontSize: "12px", fontWeight: "600", color: "#f59e0b" },
  productTitle: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 20px 0",
    color: "#1e293b",
    height: "50px",
    overflow: "hidden",
    lineHeight: "1.4",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceColumn: { display: "flex", flexDirection: "column" },
  priceTag: { fontSize: "24px", fontWeight: "800", color: "#1a1a1a" },
  oldPrice: {
    fontSize: "14px",
    color: "#94a3b8",
    textDecoration: "line-through",
  },
  addBtn: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  pagination: {
    marginTop: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
  },
  pageBtn: {
    padding: "12px 28px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  pageIndicator: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#4338ca",
    color: "#fff",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "18px",
  },
  skeletonCard: {
    height: "400px",
    background: "#f1f5f9",
    borderRadius: "24px",
  },
  emptyState: { gridColumn: "1 / -1", textAlign: "center", padding: "80px 0" },
  resetBtn: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#4338ca",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default ProductList;
