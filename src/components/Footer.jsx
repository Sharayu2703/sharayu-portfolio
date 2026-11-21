import { Link } from "react-router-dom";
import { profile, socialLinks } from "../data/profile";
import "./Footer.css";

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <Link className="brand" to="/" aria-label="Sharayu Borude — home">
          {/* <span className="brand-mark">S<span>B</span></span> */}
          <span className="brand-name">sharayu</span>
        </Link>
        <p>Designed with curiosity, built with code, powered by ideas.</p>
      </div>
      <nav className="footer-navigation" aria-label="Footer navigation">
        <a href="/#about">About</a>
        <a href="/#skills">Skills</a>
        <Link to="/projects">Projects</Link>
        <a href="/#journey">Journey</a>
        <a href="/#contact">Contact</a>
      </nav>
      <div className="footer-socials" aria-label="Social profiles">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
          >
            {item.short}
          </a>
        ))}
      </div>
    </div>
    <div className="container footer-bottom">
      <span>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </span>
      <span>Designed &amp; built with React + Vite.</span>
    </div>
  </footer>
);

export default Footer;
