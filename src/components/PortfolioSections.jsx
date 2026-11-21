import { useState } from 'react';
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import {
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiRedux,
  SiVercel,
  SiVite,
} from 'react-icons/si';
import { achievements, education, experience, profile, socialLinks } from '../data/profile';
import { skillGroups } from '../data/skills';
import SectionHeading from './SectionHeading';

const socialIcons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  Instagram: FaInstagram,
};

const skillIcons = {
  JavaScript: SiJavascript,
  Python: SiPython,
  SQL: SiPostgresql,
  HTML: SiHtml5,
  CSS: SiCss3,
  React: SiReact,
  'React Router': SiReactrouter,
  'Redux Toolkit': SiRedux,
  Vite: SiVite,
  Bootstrap: SiBootstrap,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  'REST APIs': GlobeAltIcon,
  GraphQL: SiGraphql,
  Flask: SiFlask,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Docker: SiDocker,
  Vercel: SiVercel,
};

export const AboutSection = ({ compact = false }) => (
  <section className={`section about-section${compact ? ' about-section-compact' : ''}`} id="about">
    <div className="container">
      <SectionHeading
        eyebrow="A little about me"
        title="Beyond the code"
        description="A little about my journey."
        id="about-heading"
        level={compact ? 1 : 2}
      />
      <div className="about-grid reveal">
        <article className="about-story surface-card">
          <span className="about-mark" aria-hidden="true">SB</span>
          <div>
            <p>{profile.about}</p>
            <p>{profile.careerNote}</p>
          </div>
        </article>
        <aside className="about-values">
          <div className="value-card surface-card">
            <span className="value-number">01</span>
            <h3>AI explorer</h3>
            <p>Explore practical AI applications, language models, and ways to make intelligent features useful in real products.</p>
          </div>
          <div className="value-card surface-card">
            <span className="value-number">03</span>
            <h3>Continuous learner</h3>
            <p>Learn each tool by using it in practical projects, then refine the approach through testing and feedback.</p>
          </div>
          <div className="value-card surface-card">
            <span className="value-number">04</span>
            <h3>Problem solver</h3>
            <p>Break unclear problems into manageable parts and prefer clear, dependable solutions over unnecessary complexity.</p>
          </div>
          <div className="value-card surface-card">
            <span className="value-number">02</span>
            <h3>Creative builder</h3>
            <p>Turn ideas into responsive interfaces and complete workflows across frontend and backend technologies.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

export const SkillsSection = () => (
  <section className="section skills-section" id="skills">
    <div className="container">
      <SectionHeading
        eyebrow="AI & technical skills"
        title="AI first. Full stack by design."
        description="A project-led toolkit across AI exploration, frontend, backend, data, and local model integration."
        id="skills-heading"
      />
      <div className="skills-grid reveal">
        {skillGroups.map((group) => (
          <article className="skill-card surface-card" key={group.title}>
            <div className="skill-card-top">
              <span className="skill-index">{group.index}</span>
              <span className="skill-count">{String(group.skills.length).padStart(2, '0')} skills</span>
            </div>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill] || SparklesIcon;
                return (
                  <li key={skill}>
                    <Icon aria-hidden="true" />
                    {skill}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ExperienceSection = () => (
  <section className="section experience-section" id="journey">
    <div className="container">
      <SectionHeading
        eyebrow="My AI journey"
        title="My journey into AI."
        description="A continuous learning path across computer engineering, full-stack development, AI exploration, and practical experiments."
        id="experience-heading"
      />
      <div className="timeline reveal">
        {experience.map((item) => (
          <article className="timeline-item surface-card" key={`${item.role}-${item.organization}`}>
            <div className="timeline-marker" aria-hidden="true"><CheckCircleIcon /></div>
            <div className="timeline-header">
              <div>
                <span className="eyebrow">{item.period}</span>
                <h3>{item.role}</h3>
                <p className="timeline-org">{item.organization}</p>
              </div>
              <span className="timeline-label">
                {item.organization === 'Education'
                  ? 'Education'
                  : item.organization === 'Independent project work' || item.organization === 'Independent learning'
                    ? 'Project learning'
                    : 'Professional experience'}
              </span>
            </div>
            <p className="timeline-description">{item.description}</p>
            <ul className="experience-highlights">
              {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const EducationSection = () => (
  <section className="section education-section" id="education">
    <div className="container">
      <SectionHeading
        eyebrow="Education"
        title="Education"
        description="Computer Engineering qualification."
        id="education-heading"
      />
      <div className="education-grid reveal">
        {education.map((item) => (
          <article className="education-card surface-card" key={item.qualification}>
            <div className="education-icon" aria-hidden="true">CE</div>
            <div>
              <span className="eyebrow">{item.period}</span>
              <h3>{item.qualification}</h3>
              <p>{item.institution}</p>
              <p>{item.detail}</p>
            </div>
            <span className="education-status">Completed</span>
          </article>
        ))}
        <aside className="education-note surface-card">
          <span className="eyebrow">Achievements & learning</span>
          <ul className="achievement-list">
            {achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  </section>
);

export const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ type: 'submitting', message: 'Saving your message…' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'The contact service is unavailable.');
      }

      setFormState({ name: '', email: '', subject: '', message: '' });
      setFormStatus({
        type: 'success',
        message: 'Message saved successfully. Thank you for reaching out.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'The contact service is unavailable. Please use the email link instead.',
      });
    }
  };

  const createEmailDraft = () => {
    const subject = formState.subject.trim() || `Portfolio inquiry from ${formState.name.trim()}`;
    const body = [
      `Name: ${formState.name.trim()}`,
      `Email: ${formState.email.trim()}`,
      '',
      formState.message.trim(),
    ].join('\n');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-panel surface-card reveal">
          <div className="contact-copy">
            <span className="eyebrow">Let’s connect</span>
            <h2>Let's build something intelligent.</h2>
            <p>
              I'm always excited to explore new technologies, connect with developers, and work on meaningful ideas in AI and software development.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              <EnvelopeIcon aria-hidden="true" />
              {profile.email}
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <div className="contact-socials" aria-label="Social profiles">
              {socialLinks.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Sharayu on ${item.label}`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input
                autoComplete="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="How should I address you?"
              />
            </label>
            <label>
              Email address
              <input
                autoComplete="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Subject
              <input
                name="subject"
                required
                value={formState.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                rows="4"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me a little about what you have in mind."
              />
            </label>
            <button
              className="button button-primary contact-submit"
              type="submit"
              disabled={formStatus.type === 'submitting'}
            >
              {formStatus.type === 'submitting' ? 'Saving…' : 'Send message'}
              <ArrowUpRightIcon aria-hidden="true" />
            </button>
            {formStatus.message && (
              <p className={`form-status form-status-${formStatus.type}`} role="status">
                {formStatus.message}
                {formStatus.type === 'error' && (
                  <>
                    {' '}
                    <button type="button" className="form-email-fallback" onClick={createEmailDraft}>
                      Open an email draft
                    </button>
                  </>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
