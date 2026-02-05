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

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setActiveImg(data.thumbnail);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={styles.loader}>Loading product...</div>;
  }

  if (!product) {
    return <div style={styles.loader}>Product not found</div>;
  }

  return (
    <div style={styles.page}>
      {/* ===== HEADER ===== */}

      {/* ===== CONTENT ===== */}
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div style={styles.detailGrid}>
          {/* IMAGE SECTION */}
          <div style={styles.imageSection}>
            <div style={styles.mainImageBox}>
              <img
                src={activeImg}
                alt={product.title}
                style={styles.mainImage}
              />
            </div>

            <div style={styles.thumbnailRow}>
              {[product.thumbnail, ...(product.images || [])]
                .slice(0, 4)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    style={{
                      ...styles.thumbnail,
                      border:
                        activeImg === img ? "2px solid #1d2671" : (
                          "1px solid #ccc"
                        ),
                    }}
                    onClick={() => setActiveImg(img)}
                  />
                ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div style={styles.infoSection}>
            <h1 style={styles.title}>{product.title}</h1>
            <p style={styles.brand}>Brand: {product.brand}</p>

            <p style={styles.price}>₹ {Math.round(product.price * 80)}</p>

            <p style={styles.rating}>⭐ {product.rating} / 5</p>

            <p style={styles.desc}>{product.description}</p>

            <p style={styles.stock}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div style={styles.actions}>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}>
                🛒 Add to Cart
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      buyNowItem: {
                        ...product,
                        qty: 1,
                      },
                    },
                  });
                }}>
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

/* ================= STYLES ================= */

const styles = {
  /* ===== PAGE ===== */
  page: {
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  loader: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 500,
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px",
  },

  backBtn: {
    background: "transparent",
    border: "none",
    color: "#1d2671",
    cursor: "pointer",
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 600,
  },

  /* ===== PRODUCT CARD ===== */
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    background: "#fff",
    padding: 40,
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  /* ===== IMAGE SECTION ===== */
  imageSection: {},

  mainImageBox: {
    height: 420,
    background: "#f8f9fb",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  mainImage: {
    maxHeight: "90%",
    maxWidth: "90%",
    objectFit: "contain",
    transition: "transform 0.3s ease",
  },

  thumbnailRow: {
    display: "flex",
    gap: 12,
  },

  thumbnail: {
    width: 72,
    height: 72,
    objectFit: "contain",
    cursor: "pointer",
    padding: 6,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },

  /* ===== INFO SECTION ===== */
  infoSection: {},

  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
    color: "#111827",
  },

  brand: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 14,
  },

  price: {
    fontSize: 26,
    fontWeight: 700,
    color: "#1d2671",
    marginBottom: 8,
  },

  rating: {
    display: "inline-block",
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 14,
    marginBottom: 16,
    fontWeight: 600,
  },

  desc: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.6,
    marginBottom: 20,
  },

  stock: {
    fontWeight: 700,
    color: "#15803d",
    marginBottom: 24,
  },

  /* ===== ACTION BUTTONS ===== */
  actions: {
    display: "flex",
    gap: 16,
    marginTop: 10,
  },

  primaryBtn: {
    flex: 1,
    padding: "14px 0",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 10px 20px rgba(29,38,113,0.3)",
  },

  secondaryBtn: {
    flex: 1,
    padding: "14px 0",
    background: "#facc15",
    color: "#000",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
  },
};
