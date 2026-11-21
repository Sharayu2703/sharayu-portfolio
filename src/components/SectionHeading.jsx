const SectionHeading = ({ eyebrow, title, description, id, level = 2 }) => {
  const Heading = `h${level}`;

  return (
    <div className="section-heading reveal">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <Heading id={id}>{title}</Heading>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionHeading;
