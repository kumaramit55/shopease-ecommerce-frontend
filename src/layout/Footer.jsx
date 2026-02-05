const Footer = () => {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} ShopEase. All rights reserved.
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    height: 60,
    background: "#111",
    color: "#aaa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
  },
};
