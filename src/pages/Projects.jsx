import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProjectExplorer from '../components/ProjectExplorer';
import './Home.css';

const Projects = () => (
  <>
    <div className="projects-page-top container">
      <Link to="/" className="back-link">
        <ArrowLeftIcon aria-hidden="true" />
        Back to home
      </Link>
    </div>
    <ProjectExplorer standalone />
  </>
);

export default Projects;
