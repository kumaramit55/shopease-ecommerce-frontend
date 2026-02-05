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

        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={styles.page}>
      {/* PAGE HEADER */}
      <div style={styles.pageHeader}>
        <h2 style={styles.heading}></h2>

        <input
          style={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCT GRID */}
      <div style={styles.container}>
        <div style={styles.grid}>
          {loading ?
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={styles.skeleton} />
            ))
          : filteredProducts.map((item) => (
              <div
                key={item.id}
                style={styles.card}
                onClick={() => navigate(`/products/${item.id}`)}>
                <div style={styles.imageBox}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={styles.image}
                  />
                </div>

                <div style={styles.cardBody}>
                  <p style={styles.title}>{item.title.slice(0, 42)}</p>

                  <p style={styles.price}>₹ {Math.round(item.price * 80)}</p>

                  <button
                    style={styles.btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${item.id}`);
                    }}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}>
            ← Prev
          </button>

          <span style={styles.pageText}>Page {page + 1}</span>

          <button style={styles.pageBtn} onClick={() => setPage((p) => p + 1)}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
  },

  pageHeader: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 20px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    margin: 0,
    fontWeight: 700,
  },

  search: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    minWidth: 240,
    fontSize: 14,
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px 40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: 24,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  imageBox: {
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderBottom: "1px solid #eee",
  },

  image: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
  },

  cardBody: {
    padding: 14,
    textAlign: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
  },

  price: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 12,
    color: "#1d2671",
  },

  btn: {
    padding: "8px 16px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  skeleton: {
    height: 320,
    background: "#e0e0e0",
    borderRadius: 14,
  },

  pagination: {
    marginTop: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  pageBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#fff",
    fontWeight: 600,
  },

  pageText: {
    fontWeight: 600,
  },
};
