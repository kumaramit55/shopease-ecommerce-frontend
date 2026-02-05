import { useNavigate } from "react-router";
import useProducts from "./useProducts";

/* ================= UTIL ================= */
const formatPrice = (value) => {
  if (value === undefined || value === null) return "0.00";
  return Number(value).toFixed(2);
};

/* ================= COMPONENT ================= */
const ProductList = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, updateProduct } = useProducts();

  const toggleStatus = (id, currentStatus) => {
    updateProduct(id, { isActive: !currentStatus });
  };

  return (
    <div style={styles.wrapper}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>

        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin/products/add")}>
          + Add Product
        </button>
      </div>

      {/* TITLE */}
      <h2 style={styles.title}>Manage Products</h2>

      {/* EMPTY STATE */}
      {products.length === 0 ?
        <div style={styles.emptyState}>
          <p>No products added yet.</p>
          <button
            style={styles.addBtn}
            onClick={() => navigate("/admin/products/add")}>
            Add Your First Product
          </button>
        </div>
      : /* TABLE */
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Discount</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fafbff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }>
                  {/* NAME */}
                  <td
                    style={{
                      ...styles.td,
                      fontWeight: 600,
                    }}>
                    {product.name}
                  </td>

                  {/* PRICE */}
                  <td style={styles.td}>
                    <strong>₹{formatPrice(product.finalPrice)}</strong>
                    {product.discountPercent > 0 && (
                      <span style={styles.oldPrice}>
                        ₹{formatPrice(product.price)}
                      </span>
                    )}
                  </td>

                  {/* DISCOUNT */}
                  <td style={styles.td}>
                    {product.discountPercent > 0 ?
                      <span style={styles.discountBadge}>
                        {product.discountPercent}% OFF
                      </span>
                    : <span style={styles.muted}>—</span>}
                  </td>

                  {/* STATUS */}
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background: product.isActive ? "#2a9d8f" : "#adb5bd",
                      }}
                      onClick={() =>
                        toggleStatus(product.id, product.isActive)
                      }>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td
                    style={{
                      ...styles.td,
                      textAlign: "right",
                    }}>
                    <div style={styles.actionGroup}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`)
                        }>
                        Edit
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default ProductList;

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    padding: 24,
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  backBtn: {
    background: "transparent",
    border: "none",
    color: "#1d2671",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  title: {
    marginBottom: 20,
    fontWeight: 700,
  },

  addBtn: {
    background: "#1d2671",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  tableContainer: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    background: "#f8f9fb",
  },

  td: {
    padding: "14px 16px",
    borderTop: "1px solid #eee",
    fontSize: 14,
  },

  row: {
    transition: "background 0.2s",
  },

  oldPrice: {
    marginLeft: 8,
    color: "#999",
    textDecoration: "line-through",
    fontSize: 13,
  },

  discountBadge: {
    background: "#ffe3e3",
    color: "#c92a2a",
    padding: "4px 8px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },

  statusBadge: {
    padding: "4px 12px",
    borderRadius: 999,
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none",
  },

  actionGroup: {
    display: "inline-flex",
    gap: 8,
  },

  editBtn: {
    background: "#457b9d",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  muted: {
    color: "#aaa",
  },

  emptyState: {
    background: "#fff",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
};
