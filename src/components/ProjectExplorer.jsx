import { useCallback, useMemo, useState } from 'react';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import SectionHeading from './SectionHeading';

const ProjectExplorer = ({ standalone = false }) => {
  const [category, setCategory] = useState('All projects');
  const [technology, setTechnology] = useState('All technologies');
  const [selectedProject, setSelectedProject] = useState(null);
  const handleDialogClose = useCallback(() => setSelectedProject(null), []);
  const allTechnologies = useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies))].sort(),
    [],
  );

  const visibleProjects = useMemo(
    () => {
      const deployedProjects = projects.filter((project) => Boolean(project.live));
      const filteredProjects = deployedProjects.filter((project) => (
        (category === 'All projects' || project.categories.includes(category))
        && (technology === 'All technologies' || project.technologies.includes(technology))
      ));
      return standalone ? filteredProjects : filteredProjects.slice(0, 3);
    },
    [category, technology, standalone],
  );

  return (
    <section className={`section projects-section${standalone ? ' projects-page-section' : ''}`} id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={standalone ? 'Project archive' : 'Featured projects'}
          title={standalone ? 'Things I’ve built' : 'Things I’ve built'}
          description="Real projects. Practical learning. Continuous exploration."
          id="projects-heading"
          level={standalone ? 1 : 2}
        />

        <div className="project-filters" aria-label="Filter projects">
          <div className="category-filters" role="group" aria-label="Project category">
            <button
              type="button"
              className={category === 'All projects' ? 'filter-chip is-active' : 'filter-chip'}
              aria-pressed={category === 'All projects'}
              onClick={() => setCategory('All projects')}
            >
              All projects
            </button>
            {projectCategories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? 'filter-chip is-active' : 'filter-chip'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item.replace(' Projects', '')}
              </button>
            ))}
          </div>
          <label className="technology-filter">
            <span>Technology</span>
            <select value={technology} onChange={(event) => setTechnology(event.target.value)}>
              <option>All technologies</option>
              {allTechnologies.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <p className="project-results-count" aria-live="polite">
          Showing <strong>{visibleProjects.length}</strong> {visibleProjects.length === 1 ? 'project' : 'projects'}
        </p>

        {visibleProjects.length > 0 ? (
          <div className="project-grid reveal">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        ) : (
          <div className="empty-projects surface-card">
            <p>No projects match these filters.</p>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => {
                setCategory('All projects');
                setTechnology('All technologies');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="ai-opportunities surface-card reveal">
          <div className="ai-opportunities-heading">
            <span className="eyebrow">AI, with a reason</span>
            <h3>Useful extensions, not AI for its own sake.</h3>
            <p>These are ideas only; they are not features in the linked projects.</p>
          </div>
          <div className="ai-idea-list">
            <div>
              <span>01</span>
              <p><strong>Meetup</strong> · search events using natural-language interests and the existing tags.</p>
            </div>
            <div>
              <span>02</span>
              <p><strong>Shipshape</strong> · draft release notes from checked steps, with human approval.</p>
            </div>
            <div>
              <span>03</span>
              <p><strong>Ratewise</strong> · explain the latest available rates; historical insights would need stored history first.</p>
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={handleDialogClose} />
      )}
    </section>
  );
};

export default ProjectExplorer;
