const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerMain}>
          {/* Brand Column */}
          <div style={styles.column}>
            <h3 style={styles.logo}>
              Shop<span style={{ color: "#4338ca" }}>Ease</span>
            </h3>
            <p style={styles.description}>
              Elevating your everyday shopping experience with curated
              collections and premium service.
            </p>
            <div style={styles.socialRow}>
              {["FB", "TW", "IG", "LI"].map((soc) => (
                <div key={soc} style={styles.socialIcon}>
                  {soc}
                </div>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}>Shop</h4>
            <span style={styles.link}>All Products</span>
            <span style={styles.link}>Featured</span>
            <span style={styles.link}>New Arrivals</span>
          </div>

          {/* Links Column 2 */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}>Support</h4>
            <span style={styles.link}>Help Center</span>
            <span style={styles.link}>Shipping Policy</span>
            <span style={styles.link}>Returns & Refunds</span>
          </div>

          {/* Contact Column */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}>Contact</h4>
            <span style={styles.link}>support@shopease.com</span>
            <span style={styles.link}>+1 (555) 000-1234</span>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copyText}>
            © {new Date().getFullYear()} ShopEase Inc. All rights reserved.
          </p>
          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Privacy Policy</span>
            <span style={styles.bottomLink}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= STYLES ================= */

const styles = {
  footer: {
    background: "#0f172a", // Deep slate for a modern look
    color: "#9ca3af",
    padding: "80px 0 30px 0",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
  },
  footerMain: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    marginBottom: "60px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: {
    color: "#fff",
    margin: "0 0 10px 0",
    fontSize: "24px",
    fontWeight: 800,
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    maxWidth: "240px",
  },
  colTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "10px",
  },
  link: {
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.2s",
    textDecoration: "none",
    color: "inherit",
    ":hover": { color: "#fff" }, // Note: Inline hover requires a state or CSS file
  },
  socialRow: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  socialIcon: {
    width: "32px",
    height: "32px",
    background: "#1e293b",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  bottomBar: {
    borderTop: "1px solid #1e293b",
    paddingTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  copyText: {
    fontSize: "13px",
    margin: 0,
  },
  bottomLinks: {
    display: "flex",
    gap: "24px",
  },
  bottomLink: {
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default Footer;
