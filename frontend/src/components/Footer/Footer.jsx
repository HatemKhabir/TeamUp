// src/components/Footer/Footer.jsx

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.logoSection}>
            <h2 className={styles.footerLogo}>TeamUp</h2>
          </div>
          <nav className={styles.footerNav}>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </nav>
          <div className={styles.socialMedia}>
            {/* Placeholder for social media icons */}
            <a href="https://facebook.com" aria-label="Facebook">Facebook</a>
            <a href="https://twitter.com" aria-label="Twitter">Twitter</a>
            <a href="https://instagram.com" aria-label="Instagram">Instagram</a>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} TeamUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
