import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import useProducts from "./useProducts";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useProducts();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPercent: "",
    stock: "",
    isActive: true,
    image: "",
    category: "Electronics", // Added category
  });

  useEffect(() => {
    if (isEditMode) {
      const existing = products.find((p) => p.id === id);
      if (existing) setForm(existing);
    }
  }, [id, isEditMode, products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const finalPrice =
    form.price && form.discountPercent ?
      Math.round(form.price - (form.price * form.discountPercent) / 100)
    : form.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: isEditMode ? id : Date.now().toString(),
      price: Number(form.price),
      discountPercent: Number(form.discountPercent),
      finalPrice: Number(finalPrice),
      stock: Number(form.stock),
      updatedAt: new Date().toISOString(),
    };

    if (isEditMode) {
      updateProduct(id, payload);
    } else {
      addProduct(payload);
    }
    navigate("/admin/products");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT: FORM */}
        <div style={styles.formCard}>
          <div style={styles.header}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
              ← Back
            </button>
            <h2 style={styles.title}>
              {isEditMode ? "Update Product" : "Create New Listing"}
            </h2>
            <p style={styles.subText}>
              Configure your product details and pricing
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Product Title</label>
              <input
                style={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Premium Leather Watch"
                required
              />
            </div>

            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>Base Price (₹)</label>
                <input
                  style={styles.input}
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Discount (%)</label>
                <input
                  style={styles.input}
                  name="discountPercent"
                  type="number"
                  value={form.discountPercent}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>Inventory Stock</label>
                <input
                  style={styles.input}
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Units available"
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Category</label>
                <select
                  style={styles.select}
                  name="category"
                  value={form.category}
                  onChange={handleChange}>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home Decor</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Upload Product Media</label>
              <div style={styles.uploadBox}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                  id="file-upload"
                />
                <label htmlFor="file-upload" style={styles.fileLabel}>
                  {form.image ?
                    "Change Image"
                  : "Click to upload product image"}
                </label>
              </div>
            </div>

            <div style={styles.toggleRow}>
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span style={styles.toggleText}>Visible on storefront</span>
            </div>

            <div style={styles.actions}>
              <button type="submit" style={styles.primaryBtn}>
                {isEditMode ? "Confirm Changes" : "Publish Product"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div style={styles.previewPanel}>
          <h3 style={styles.previewTitle}>Live Storefront Preview</h3>
          <div style={styles.previewCard}>
            <div style={styles.previewImgBox}>
              {form.image ?
                <img src={form.image} alt="Preview" style={styles.previewImg} />
              : <div style={styles.placeholderImg}>No Image Selected</div>}
            </div>
            <div style={styles.previewInfo}>
              <span style={styles.previewCategory}>{form.category}</span>
              <h4 style={styles.previewName}>{form.name || "Product Name"}</h4>
              <div style={styles.previewPriceRow}>
                <span style={styles.previewPrice}>₹{finalPrice || 0}</span>
                {form.discountPercent > 0 && (
                  <span style={styles.previewOldPrice}>₹{form.price}</span>
                )}
              </div>
              <div style={styles.previewStock}>
                {form.stock > 0 ? `In Stock: ${form.stock}` : "Out of Stock"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= PRESET PREMIUM STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "40px",
  },

  formCard: {
    background: "#fff",
    padding: "40px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.04)",
  },
  header: { marginBottom: "32px" },
  backBtn: {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: "12px",
    padding: 0,
  },
  title: { fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 },
  subText: { color: "#64748b", marginTop: "4px" },

  form: { display: "flex", flexDirection: "column", gap: "24px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: 700, color: "#475569" },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e2e8f0",
    outline: "none",
    fontSize: "15px",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    outline: "none",
  },

  uploadBox: {
    border: "2px dashed #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    position: "relative",
  },
  fileInput: {
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    left: 0,
    top: 0,
  },
  fileLabel: { color: "#6366f1", fontWeight: 600, fontSize: "14px" },

  toggleRow: { display: "flex", alignItems: "center", gap: "10px" },
  checkbox: { width: "18px", height: "18px", cursor: "pointer" },
  toggleText: { fontSize: "14px", fontWeight: 600, color: "#475569" },

  primaryBtn: {
    padding: "16px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "16px",
  },

  /* PREVIEW PANEL */
  previewPanel: { position: "sticky", top: "40px", height: "fit-content" },
  previewTitle: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#1e293b",
    marginBottom: "24px",
  },
  previewCard: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #f1f5f9",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  },
  previewImgBox: {
    height: "240px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },
  placeholderImg: { color: "#94a3b8", fontWeight: 600 },
  previewInfo: { padding: "20px" },
  previewCategory: {
    fontSize: "11px",
    fontWeight: 800,
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  previewName: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "8px 0",
    color: "#1e293b",
  },
  previewPriceRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  previewPrice: { fontSize: "20px", fontWeight: 800, color: "#1e293b" },
  previewOldPrice: {
    fontSize: "14px",
    color: "#94a3b8",
    textDecoration: "line-through",
  },
  previewStock: { fontSize: "13px", color: "#10b981", fontWeight: 600 },
};

export default AddEditProduct;
