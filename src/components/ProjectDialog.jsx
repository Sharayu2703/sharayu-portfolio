import { useEffect, useRef } from 'react';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProjectDialog = ({ project, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
  }, []);

  const closeDialog = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
  };

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) closeDialog();
  };

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby={`dialog-title-${project.id}`}
      onClick={handleBackdropClick}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDialog();
        }
      }}
    >
      <div className="project-dialog-inner">
        <button
          className="dialog-close"
          type="button"
          onClick={closeDialog}
          aria-label="Close project details"
        >
          <XMarkIcon aria-hidden="true" />
        </button>
        <span className="eyebrow">{project.status}</span>
        <h2 id={`dialog-title-${project.id}`}>{project.title}</h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        <p className="dialog-description">{project.description}</p>

        <h3>What it does</h3>
        <ul className="dialog-feature-list">
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>

        <h3>Built with</h3>
        <ul className="project-tech-list dialog-tech-list">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>

        {project.aiFeature && (
          <div className="ai-note">
            <span className="eyebrow">AI in this project</span>
            <p>{project.aiFeature}</p>
          </div>
        )}
        {project.aiOpportunity && (
          <div className="ai-note ai-note-proposed">
            <span className="eyebrow">Possible next experiment · not implemented</span>
            <p>{project.aiOpportunity}</p>
          </div>
        )}

        <div className="dialog-actions">
          <a className="button button-secondary" href={project.repository} target="_blank" rel="noreferrer">
            <ArrowUpRightIcon aria-hidden="true" />
            Project repository
          </a>
          {project.companionRepository && (
            <a className="button button-secondary" href={project.companionRepository} target="_blank" rel="noreferrer">
              <ArrowUpRightIcon aria-hidden="true" />
              Companion repository
            </a>
          )}
          {project.live && (
            <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">
              <ArrowUpRightIcon aria-hidden="true" />
              Open live demo
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjectDialog;
