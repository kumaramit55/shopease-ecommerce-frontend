import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }
    login(formData.role);
    navigate(formData.role === "ADMIN" ? "/admin" : "/");
  };

  return (
    <div style={styles.page}>
      {/* LEFT SIDE: BRANDING/UI */}
      {!isMobile && (
        <div style={styles.leftPanel}>
          <div style={styles.overlay} />
          <div style={styles.brandContent}>
            <div style={styles.badge}>New Collection 2026</div>
            <h1 style={styles.brandTitle}>
              Elevate Your <br />
              Shopping Experience.
            </h1>
            <p style={styles.brandSubtitle}>
              Join over 2 million shoppers and get access to exclusive deals,
              personalized recommendations, and lightning-fast checkout.
            </p>
            <div style={styles.features}>
              <div style={styles.featureItem}>✦ Free Global Shipping</div>
              <div style={styles.featureItem}>✦ 24/7 Premium Support</div>
              <div style={styles.featureItem}>✦ Secure Encrypted Payments</div>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT SIDE: LOGIN FORM */}
      <div style={{ ...styles.rightPanel, width: isMobile ? "100%" : "50%" }}>
        <div
          style={{
            ...styles.formContainer,
            width: isMobile ? "90%" : "440px",
          }}>
          <div style={styles.mobileLogo}>ShopEase</div>
          <div style={styles.header}>
            <h2 style={styles.title}>Sign In</h2>
            <p style={styles.subtitle}>
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Login Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.select}>
                <option value="USER">Customer Account</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <button type="submit" style={styles.button}>
              Sign In to Account
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{" "}
              <span style={styles.link}>Create one for free</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* 🔹 SPLIT-SCREEN STYLES */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    background: "#fff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    overflow: "hidden",
  },

  /* LEFT PANEL */
  /* Updated Left Panel Image for Login */
  leftPanel: {
    width: "50%",
    position: "relative",
    // New Urban Professional/Tech lifestyle image
    background:
      "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 80px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(29, 38, 113, 0.9), rgba(195, 55, 100, 0.4))",
  },
  brandContent: {
    position: "relative",
    zIndex: 2,
    color: "#fff",
  },
  badge: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
    marginBottom: "24px",
    backdropFilter: "blur(10px)",
  },
  brandTitle: {
    fontSize: "48px",
    lineHeight: "1.1",
    fontWeight: "800",
    marginBottom: "20px",
  },
  brandSubtitle: {
    fontSize: "18px",
    lineHeight: "1.6",
    opacity: "0.9",
    marginBottom: "40px",
    maxWidth: "500px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontWeight: "600",
    fontSize: "14px",
  },

  /* RIGHT PANEL */
  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
  },
  formContainer: {
    padding: "20px",
  },
  mobileLogo: {
    display: "none", // Logic can be added to show only on mobile
    fontSize: "24px",
    fontWeight: "800",
    color: "#1d2671",
    marginBottom: "40px",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#475569",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s",
  },
  select: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e2e8f0",
    fontSize: "16px",
    background: "#fff",
    outline: "none",
  },
  button: {
    padding: "16px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#1d2671",
    fontWeight: "700",
    cursor: "pointer",
  },
};
