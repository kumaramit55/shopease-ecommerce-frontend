import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import useProducts from "./useProducts";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // edit mode ke liye
  const { products, addProduct, updateProduct } = useProducts();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPercent: "",
    stock: "",
    isActive: true,
    image: "", // 👈 NEW
  });

  // 🔹 Edit mode me existing product load karo
  useEffect(() => {
    if (isEditMode) {
      const existing = products.find((p) => p.id === id);
      if (existing) {
        setForm(existing);
      }
    }
  }, [id, isEditMode, products]);

  // 🔹 Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        image: reader.result, // base64
      });
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Final price calculation
  const finalPrice =
    form.price && form.discountPercent ?
      form.price - (form.price * form.discountPercent) / 100
    : form.price;

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      id: isEditMode ? id : Date.now().toString(),
      price: Number(form.price),
      discountPercent: Number(form.discountPercent),
      finalPrice: Number(finalPrice),
      stock: Number(form.stock),
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
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <p style={styles.subText}>Fill product details below</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Product Name</label>
              <input
                style={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Nike Air Max"
                required
              />
            </div>

            <div>
              <label style={styles.label}>Stock</label>
              <input
                style={styles.input}
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="Available quantity"
                required
              />
            </div>

            <div>
              <label style={styles.label}>Price (₹)</label>
              <input
                style={styles.input}
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Original price"
                required
              />
            </div>

            <div>
              <label style={styles.label}>Discount (%)</label>
              <input
                style={styles.input}
                name="discountPercent"
                type="number"
                value={form.discountPercent}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </div>
          <div>
            <label style={styles.label}>Product Image</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {form.image && (
              <div style={styles.imagePreview}>
                <img src={form.image} alt="Preview" style={styles.previewImg} />
              </div>
            )}
          </div>

          {/* PRICE SUMMARY */}
          <div style={styles.priceBox}>
            <span>Final Price</span>
            <strong>₹{finalPrice || 0}</strong>
          </div>

          <div style={styles.checkboxRow}>
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span>Product is active and visible to users</span>
          </div>

          <div style={styles.actions}>
            <button type="submit" style={styles.primaryBtn}>
              {isEditMode ? "Update Product" : "Save Product"}
            </button>

            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => navigate("/admin")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: 24,
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    borderRadius: 14,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  header: {
    marginBottom: 24,
  },

  subText: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 6,
    display: "block",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },

  priceBox: {
    background: "#f1f3ff",
    padding: 16,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    color: "#1d2671",
    fontWeight: 600,
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#444",
  },

  actions: {
    display: "flex",
    gap: 12,
    marginTop: 10,
  },

  primaryBtn: {
    background: "#1d2671",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  secondaryBtn: {
    background: "#e0e0e0",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
