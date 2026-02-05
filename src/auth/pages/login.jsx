import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

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
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
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
            <label style={styles.label}>Login as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>Demo login • Role based access</p>
      </div>
    </div>
  );
};

export default Login;

/* 🔹 INLINE STYLES */
const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1d2671, #c33764)",
  },
  card: {
    width: 380,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginBottom: 25,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#1d2671",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 18,
  },
};
