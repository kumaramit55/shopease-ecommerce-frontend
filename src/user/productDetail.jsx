import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCart } from "../auth/store/cartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
        setActiveImg(data.thumbnail);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // Clear product state on error
      } finally {
        setLoading(false); // This will run no matter what happens
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <div style={styles.loader}>✨ Polishing your selection...</div>;
  if (!product) return <div style={styles.loader}>Product not found</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* BREADCRUMB / BACK */}
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Marketplace
        </button>

        <div
          style={{
            ...styles.detailGrid,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            padding: isMobile ? "20px" : "40px",
          }}>
          {/* LEFT: IMAGE GALLERY */}
          <div style={styles.imageSection}>
            <div style={styles.mainImageBox}>
              {product.discountPercentage > 0 && (
                <div style={styles.promoBadge}>
                  -{Math.round(product.discountPercentage)}% OFF
                </div>
              )}
              <img
                src={activeImg}
                alt={product.title}
                style={styles.mainImage}
              />
            </div>

            <div style={styles.thumbnailRow}>
              {[product.thumbnail, ...(product.images || [])]
                .filter((img, index, self) => self.indexOf(img) === index) // Unique images only
                .slice(0, 5)
                .map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(img)}
                    style={{
                      ...styles.thumbWrapper,
                      borderColor: activeImg === img ? "#4338ca" : "#e2e8f0",
                      transform: activeImg === img ? "scale(1.05)" : "scale(1)",
                    }}>
                    <img src={img} alt="thumb" style={styles.thumbnail} />
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div style={styles.infoSection}>
            <div style={styles.headerInfo}>
              <span style={styles.categoryTag}>{product.category}</span>
              <span style={styles.ratingBox}>⭐ {product.rating}</span>
            </div>

            <h1 style={styles.title}>{product.title}</h1>
            <p style={styles.brandText}>
              By{" "}
              <span style={{ color: "#4338ca", fontWeight: 700 }}>
                {product.brand || "ShopEase Elite"}
              </span>
            </p>

            <div style={styles.priceContainer}>
              <h2 style={styles.price}>${product.price}</h2>
              <span style={styles.originalPrice}>
                ${Math.round(product.price * 1.2)}
              </span>
            </div>

            <p style={styles.description}>{product.description}</p>

            <div style={styles.statusRow}>
              <div
                style={{
                  ...styles.stockIndicator,
                  background: product.stock > 0 ? "#dcfce7" : "#fee2e2",
                  color: product.stock > 0 ? "#15803d" : "#ef4444",
                }}>
                {product.stock > 0 ?
                  `● In Stock (${product.stock})`
                : "○ Out of Stock"}
              </div>
            </div>

            <div style={styles.divider} />

            {/* CTA ACTIONS */}
            <div
              style={{
                ...styles.actions,
                flexDirection: isMobile ? "column" : "row",
              }}>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  addToCart(product);
                  navigate("/cart"); // Uncomment if you want immediate redirect
                }}>
                Add to Cart
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() =>
                  navigate("/checkout", {
                    state: { buyNowItem: { ...product, qty: 1 } },
                  })
                }>
                Buy Now
              </button>
            </div>

            {/* TRUST BADGES */}
            <div style={styles.trustGrid}>
              <div style={styles.trustItem}>✅ Authentic Product</div>
              <div style={styles.trustItem}>🚚 Free Delivery</div>
              <div style={styles.trustItem}>🔄 30-Day Return</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    paddingTop: "100px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  loader: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 700,
    color: "#4338ca",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px 60px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    marginBottom: "24px",
    fontSize: "14px",
    fontWeight: 600,
    transition: "color 0.2s",
  },
  detailGrid: {
    display: "grid",
    gap: "50px",
    background: "#fff",
    borderRadius: "32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f1f5f9",
  },

  /* IMAGE GALLERY */
  mainImageBox: {
    height: "450px",
    background: "#fcfcfd",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #f1f5f9",
  },
  mainImage: {
    maxHeight: "85%",
    maxWidth: "85%",
    objectFit: "contain",
  },
  promoBadge: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "#ef4444",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 800,
  },
  thumbnailRow: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    justifyContent: "center",
  },
  thumbWrapper: {
    width: "70px",
    height: "70px",
    borderRadius: "14px",
    padding: "4px",
    border: "2px solid transparent",
    cursor: "pointer",
    background: "#fff",
    transition: "all 0.2s ease",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  /* CONTENT SECTION */
  headerInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  categoryTag: {
    textTransform: "uppercase",
    fontSize: "11px",
    fontWeight: 800,
    color: "#94a3b8",
    letterSpacing: "1px",
  },
  ratingBox: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#f59e0b",
    background: "#fffbeb",
    padding: "4px 10px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#1e293b",
    margin: "0 0 8px 0",
    lineHeight: "1.2",
  },
  brandText: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0 0 24px 0",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "20px",
  },
  price: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#1e293b",
    margin: 0,
  },
  originalPrice: {
    fontSize: "18px",
    color: "#94a3b8",
    textDecoration: "line-through",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#475569",
    marginBottom: "30px",
  },
  statusRow: {
    marginBottom: "30px",
  },
  stockIndicator: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 700,
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    marginBottom: "30px",
  },
  actions: {
    display: "flex",
    gap: "16px",
    marginBottom: "40px",
  },
  primaryBtn: {
    flex: 1,
    padding: "18px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  secondaryBtn: {
    flex: 1,
    padding: "18px",
    background: "#4338ca",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(67, 56, 202, 0.2)",
  },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
  },
  trustItem: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748b",
    textAlign: "center",
  },
};

export default ProductDetail;
