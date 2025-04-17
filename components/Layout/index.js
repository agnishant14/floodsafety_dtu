import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FooterLanding from "../FooterLanding";
import styles from "@/styles/layout.module.css";

const Layout = ({ children, height = null, footerLanding }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.navbar}
        style={{
          position: height && "fixed",
          width: height && "100%",
          background: height && "white",
          zIndex: height && 10000,
        }}
      >
        <Navbar />
      </div>

      <div
        className={styles.content}
        style={{ height: height == "auto" && "auto" }}
      >
        {children}
      </div>
      <div className={styles.footer}>
        {footerLanding ? <FooterLanding /> : <Footer />}
      </div>
    </div>
  );
};

export default Layout;
