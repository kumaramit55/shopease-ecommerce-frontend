import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import useProducts from "./useProducts";

const formatPrice = (value) => {
  if (value === undefined || value === null) return "0.00";
  return Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2 });
};

const ProductList = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, updateProduct } = useProducts();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleStatus = (id, currentStatus) => {
    updateProduct(id, { isActive: !currentStatus });
  };

  return (
    <div style={styles.wrapper}>
      {/* TOP HEADER */}
      <div style={styles.topBar}>
        <div>
          <button style={styles.backBtn} onClick={() => navigate("/admin")}>
            ← Dashboard
          </button>
          <h2 style={styles.title}>Product Inventory</h2>
        </div>

        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin/products/add")}>
          <span>+</span> {!isMobile && "Add New Product"}
        </button>
      </div>

      {products.length === 0 ?
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <h3>Your inventory is empty</h3>
          <p style={styles.emptyText}>
            Start adding products to see them listed here.
          </p>
          <button
            style={styles.addBtn}
            onClick={() => navigate("/admin/products/add")}>
            Create First Product
          </button>
        </div>
      : <div style={styles.tableCard}>
          <div style={styles.tableResponsiveWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product Details</th>
                  <th style={styles.th}>Price Info</th>
                  <th style={styles.th}>Inventory</th>
                  <th style={styles.th}>Status</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>
                    Management
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={styles.row}>
                    {/* PRODUCT DETAILS */}
                    <td style={styles.td}>
                      <div style={styles.productCell}>
                        <div style={styles.imgContainer}>
                          {product.image ?
                            <img
                              src={product.image}
                              style={styles.thumb}
                              alt=""
                            />
                          : <div style={styles.placeholderThumb}>?</div>}
                        </div>
                        <div>
                          <div style={styles.prodName}>{product.name}</div>
                          <div style={styles.prodId}>
                            ID: #{product.id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* PRICE INFO */}
                    <td style={styles.td}>
                      <div style={styles.priceContainer}>
                        <span style={styles.currentPrice}>
                          ₹{formatPrice(product.finalPrice)}
                        </span>
                        {product.discountPercent > 0 && (
                          <span style={styles.discountBadge}>
                            -{product.discountPercent}%
                          </span>
                        )}
                      </div>
                      {product.discountPercent > 0 && (
                        <div style={styles.originalPrice}>
                          MRP: ₹{formatPrice(product.price)}
                        </div>
                      )}
                    </td>

                    {/* STOCK */}
                    <td style={styles.td}>
                      <div
                        style={{
                          ...styles.stockText,
                          color: product.stock < 5 ? "#ef4444" : "#64748b",
                        }}>
                        {product.stock} units
                      </div>
                      {product.stock < 5 && (
                        <div style={styles.lowStock}>Low Stock</div>
                      )}
                    </td>

                    {/* STATUS */}
                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.statusToggle,
                          background: product.isActive ? "#dcfce7" : "#f1f5f9",
                          color: product.isActive ? "#166534" : "#64748b",
                        }}
                        onClick={() =>
                          toggleStatus(product.id, product.isActive)
                        }>
                        <div
                          style={{
                            ...styles.dot,
                            background:
                              product.isActive ? "#22c55e" : "#94a3b8",
                          }}
                        />
                        {product.isActive ? "Active" : "Draft"}
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <div style={styles.actionGroup}>
                        <button
                          style={styles.editBtn}
                          onClick={() =>
                            navigate(`/admin/products/edit/${product.id}`)
                          }
                          title="Edit Product">
                          ✎
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => {
                            if (window.confirm("Delete this product?"))
                              deleteProduct(product.id);
                          }}
                          title="Delete Product">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

/* ================= PREMIUM ADMIN STYLES ================= */

const styles = {
  wrapper: {
    padding: "40px 24px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#6366f1",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    marginBottom: "8px",
    display: "block",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 800,
    color: "#1e293b",
  },
  addBtn: {
    background: "#1e293b",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "0.2s",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
  },

  /* TABLE STYLING */
  tableCard: {
    background: "#fff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  tableResponsiveWrapper: {
    overflowX: "auto", // Key for responsiveness
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px", // Ensures table doesn't squish too much
  },
  th: {
    textAlign: "left",
    padding: "16px 24px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#94a3b8",
    background: "#fafafa",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "16px 24px",
    borderBottom: "1px solid #f8fafc",
    verticalAlign: "middle",
  },
  row: {
    transition: "background 0.2s",
  },

  /* PRODUCT CELL */
  productCell: { display: "flex", alignItems: "center", gap: "16px" },
  imgContainer: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#f1f5f9",
  },
  thumb: { width: "100%", height: "100%", objectFit: "cover" },
  placeholderThumb: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cbd5e1",
    fontWeight: 700,
  },
  prodName: { fontSize: "15px", fontWeight: 700, color: "#1e293b" },
  prodId: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 600,
    marginTop: "2px",
  },

  /* PRICE CELL */
  priceContainer: { display: "flex", alignItems: "center", gap: "8px" },
  currentPrice: { fontSize: "15px", fontWeight: 800, color: "#1e293b" },
  discountBadge: {
    background: "#fee2e2",
    color: "#ef4444",
    fontSize: "10px",
    fontWeight: 800,
    padding: "2px 6px",
    borderRadius: "6px",
  },
  originalPrice: {
    fontSize: "12px",
    color: "#94a3b8",
    textDecoration: "line-through",
    marginTop: "2px",
  },

  /* STOCK */
  stockText: { fontSize: "14px", fontWeight: 600 },
  lowStock: {
    fontSize: "10px",
    color: "#ef4444",
    fontWeight: 800,
    textTransform: "uppercase",
  },

  /* STATUS TOGGLE */
  statusToggle: {
    border: "none",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },
  dot: { width: "6px", height: "6px", borderRadius: "50%" },

  /* ACTIONS */
  actionGroup: { display: "flex", gap: "8px", justifyContent: "flex-end" },
  editBtn: {
    background: "#f1f5f9",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#475569",
    fontWeight: 700,
  },
  deleteBtn: {
    background: "#fef2f2",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#ef4444",
    fontWeight: 700,
  },

  /* EMPTY STATE */
  emptyState: {
    background: "#fff",
    padding: "80px 40px",
    borderRadius: "24px",
    textAlign: "center",
    border: "1px solid #f1f5f9",
  },
  emptyIcon: { fontSize: "48px", marginBottom: "20px" },
  emptyText: { color: "#64748b", marginBottom: "24px" },
};

export default ProductList;
