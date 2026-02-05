import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main style={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;

const styles = {
  main: {
    minHeight: "calc(100vh - 120px)", // header + footer space
    background: "#f4f6f8",
  },
};
