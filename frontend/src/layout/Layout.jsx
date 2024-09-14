// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
