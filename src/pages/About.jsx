import {
  AboutSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from '../components/PortfolioSections';
import './Home.css';

const About = () => (
  <>
    <AboutSection compact />
    <SkillsSection />
    <ExperienceSection />
    <EducationSection />
  </>
);

export default About;
