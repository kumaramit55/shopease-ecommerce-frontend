import { useNavigate, useLocation } from "react-router";
import { useCart } from "../auth/store/cartContext";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, totalAmount, clearCart } = useCart();

  // 🔹 Buy Now item (if exists)
  const buyNowItem = location.state?.buyNowItem;

  // 🔹 Decide checkout items
  const checkoutItems = buyNowItem ? [buyNowItem] : cart;

  // 🔹 Decide total
  const checkoutTotal =
    buyNowItem ? buyNowItem.price * buyNowItem.qty : totalAmount;

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.address || !form.city || !form.pincode) {
      alert("Please fill all address details");
      return;
    }

    // 🔹 Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem("app_orders")) || [];

    // 🔹 Create new order
    const newOrder = {
      orderId: "ORD_" + Date.now(),
      userId: "USR_101", // 🔐 logged-in user
      userName: form.name,

      items: checkoutItems.map((item) => ({
        productId: item.id,
        name: item.title,
        price: item.price,
        qty: item.qty,
        image: item.image,
      })),

      shippingAddress: {
        address: form.address,
        city: form.city,
        pincode: form.pincode,
      },

      totalAmount: checkoutTotal,
      paymentMethod: form.payment,
      status: "PLACED",
      createdAt: new Date().toLocaleString(),
    };

    // 🔹 Save order
    existingOrders.push(newOrder);
    localStorage.setItem("app_orders", JSON.stringify(existingOrders));

    // 🔹 Clear cart only if not buy-now
    if (!buyNowItem) {
      clearCart();
    }

    // 🔹 Navigate
    navigate("/order-success", {
      state: { orderId: newOrder.orderId },
    });
  };

  // 🔴 If nothing to checkout
  if (checkoutItems.length === 0) {
    return (
      <div style={styles.empty}>
        <h2 style={styles.emptyTitle}>Nothing to checkout</h2>
        <p style={styles.emptyText}>
          Your cart is empty. Add products to continue.
        </p>
        <button style={styles.primaryBtn} onClick={() => navigate("/products")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.container}>
        <h3 style={styles.pageTitle}>Checkout</h3>

        <div style={styles.layout}>
          {/* LEFT : ADDRESS */}
          <div style={styles.card}>
            <h4>Shipping Address</h4>

            <input
              name="name"
              placeholder="Full Name"
              style={styles.input}
              value={form.name}
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              style={styles.textarea}
              value={form.address}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City"
              style={styles.input}
              value={form.city}
              onChange={handleChange}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              style={styles.input}
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          {/* RIGHT : SUMMARY */}
          <div style={styles.summary}>
            <h4>Order Summary</h4>

            {checkoutItems.map((item) => (
              <div key={item.id} style={styles.summaryItem}>
                <span>
                  {item.title.slice(0, 25)} × {item.qty}
                </span>
                <span>₹ {Math.round(item.price * item.qty * 80)}</span>
              </div>
            ))}

            <hr />

            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>₹ {Math.round(checkoutTotal * 80)}</span>
            </div>

            <h4 style={{ marginTop: 20 }}>Payment Method</h4>

            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              style={styles.input}>
              <option value="COD">Cash on Delivery</option>
              <option value="CARD">Credit / Debit Card</option>
              <option value="UPI">UPI</option>
            </select>

            <button style={styles.checkoutBtn} onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

/* ================= STYLES ================= */

const styles = {
  /* ===== PAGE ===== */
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "28px 20px",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 24,
    color: "#111827",
  },

  /* ===== LAYOUT ===== */
  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 30,
  },

  /* ===== LEFT : ADDRESS CARD ===== */
  card: {
    background: "#fff",
    padding: 26,
    borderRadius: 18,
    boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    margin: "12px 0",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "12px 14px",
    margin: "12px 0",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    minHeight: 90,
    fontSize: 14,
    resize: "none",
    outline: "none",
  },

  /* ===== RIGHT : SUMMARY ===== */
  summary: {
    background: "#fff",
    padding: 26,
    borderRadius: 18,
    boxShadow: "0 20px 35px rgba(0,0,0,0.1)",
    height: "fit-content",
    position: "sticky",
    top: 20,
  },

  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    fontSize: 14,
    color: "#374151",
  },

  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 800,
    fontSize: 16,
    marginTop: 16,
    color: "#111827",
  },

  checkoutBtn: {
    width: "100%",
    padding: "14px",
    marginTop: 24,
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 12px 22px rgba(29,38,113,0.35)",
  },

  /* ===== EMPTY CHECKOUT ===== */
  empty: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
  },

  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    maxWidth: 300,
  },

  primaryBtn: {
    marginTop: 10,
    padding: "12px 26px",
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 10px 20px rgba(29,38,113,0.3)",
  },
};
