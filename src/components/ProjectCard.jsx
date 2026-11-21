import { ArrowUpRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const ProjectVisual = ({ project }) => {
  if (project.image) {
    return (
      <div className="project-visual project-visual-image">
        <img src={project.image} alt={`${project.title} project thumbnail`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual-${project.visual}`}>
      <span className="project-visual-label">{project.visualLabel}</span>
      <strong>{project.visualTitle}</strong>
      <span className="project-visual-note">{project.visualNote}</span>
      <span className="project-visual-mark" aria-hidden="true" />
    </div>
  );
};

const ProjectCard = ({ project, onOpen }) => (
  <article className="project-card surface-card">
    <ProjectVisual project={project} />
    <div className="project-card-content">
      <div className="project-card-meta">
        <span className="project-status">
          <span className={project.live ? 'status-dot is-live' : 'status-dot'} />
          {project.status}
        </span>
        <span className="project-card-type">{project.categories[0]}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>
      <ul className="project-tech-list" aria-label={`${project.title} technologies`}>
        {project.technologies.slice(0, 4).map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
        {project.technologies.length > 4 && (
          <li className="more-tech">+{project.technologies.length - 4}</li>
        )}
      </ul>
      <div className="project-card-actions">
        <button className="project-detail-button" type="button" onClick={() => onOpen(project)}>
          Details <ArrowUpRightIcon aria-hidden="true" />
        </button>
        {project.live ? (
          <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live demo`}>
            <ArrowUpRightIcon aria-hidden="true" />
            Live
          </a>
        ) : (
          <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} source code`}>
            <CodeBracketIcon aria-hidden="true" />
            Code
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
