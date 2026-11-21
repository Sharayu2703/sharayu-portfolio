import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { profile } from "../data/profile";
import "./Header.css";

const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (event, id) => {
    if (window.location.pathname !== "/") return;
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    setMenuOpen(false);
    window.history.replaceState(null, "", `/#${id}`);
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  };

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link className="brand" to="/" aria-label="Sharayu Borude — home">
          {/* <span className="brand-mark">S<span>B</span></span> */}
          <span className="brand-name">sharayu</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? (
            <XMarkIcon aria-hidden="true" />
          ) : (
            <Bars3Icon aria-hidden="true" />
          )}
        </button>

        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a
              href={`/#${item.id}`}
              key={item.id}
              className={activeSection === item.id ? "is-active" : undefined}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={(event) => {
                handleSectionClick(event, item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            className="header-resume"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
