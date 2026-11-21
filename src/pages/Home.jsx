import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeBracketIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import ProjectExplorer from '../components/ProjectExplorer';
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from '../components/PortfolioSections';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import './Home.css';

const featuredProjects = projects
  .filter((project) => project.live)
  .slice(0, 3);

const Home = () => {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return undefined;

    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);

  return (
    <>
      <section className="hero-section" id="home">
        <div className="container hero-layout">
          <div className="hero-copy reveal">
            <span className="eyebrow">Hello, I'm Sharayu</span>
            <h1>
              Exploring AI.
              <br />
              Building ideas.
              <br />
              <span className="text-gradient">Creating impact.</span>
            </h1>
            <p className="hero-role">
              <span>{profile.role}</span>
              <span className="role-separator" aria-hidden="true">/</span>
              <span>{profile.focus}</span>
            </p>
            <p className="hero-intro">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore projects <ArrowRightIcon aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href={profile.resumeUrl}
                download="Sharayu_Borude_Resume.pdf"
              >
                Download resume <ArrowDownTrayIcon aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#contact">
                Let's connect <ArrowRightIcon aria-hidden="true" />
              </a>
            </div>
            <div className="hero-socials">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <FaLinkedinIn aria-hidden="true" /> LinkedIn
              </a>
              <span className="hero-social-divider" />
              <span><span className="availability-dot" /> Open to opportunities</span>
            </div>
          </div>

          <div className="hero-bento reveal" aria-label="Portfolio highlights">
            <div className="hero-monogram surface-card">
              <div className="monogram-orbit orbit-one" aria-hidden="true" />
              <div className="monogram-orbit orbit-two" aria-hidden="true" />
              <span className="monogram-initials">S<span>B</span></span>
              <div className="monogram-caption">
                <span className="mono">PORTFOLIO / 2026</span>
                <strong>Sharayu Borude</strong>
                <span>Developer · Engineer</span>
              </div>
              <SparklesIcon className="monogram-sparkle" aria-hidden="true" />
            </div>

            <div className="hero-bento-card hero-bento-stack surface-card">
              <div className="bento-card-head">
                <span className="bento-symbol"><CodeBracketIcon aria-hidden="true" /></span>
                <span className="mono">WHAT I BUILD</span>
              </div>
              <div className="bento-stack-lines">
                <span>Interfaces that feel clear</span>
                <span>Systems that behave reliably</span>
                <span>AI that has a useful role</span>
              </div>
            </div>

            <div className="hero-bento-card hero-bento-feature surface-card">
              <div className="feature-card-top">
                <span className="eyebrow">Featured build</span>
                <span className="feature-index">01 / {String(featuredProjects.length).padStart(2, '0')}</span>
              </div>
              <h2>{featuredProjects[0].title}</h2>
              <p>{featuredProjects[0].subtitle}</p>
              <Link to="/projects" aria-label="Browse all project details">
                Explore the work <ArrowUpRightIcon aria-hidden="true" />
              </Link>
            </div>

            <div className="hero-bento-note surface-card">
              <span className="hero-note-icon"><SparklesIcon aria-hidden="true" /></span>
              <div>
                <strong>Curious by default.</strong>
                <span>Grounded in real projects.</span>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#about">
            <span className="scroll-line" aria-hidden="true" />
            Scroll to explore
          </a>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectExplorer />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
};

export default Home;
