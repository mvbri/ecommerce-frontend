import "./css/StandardSection.css";

const StandardSection = ({ children, className }) => {
  return (
    <section
      className={
        className ? `${className} standard-max-w px-6` : "standard-section px-6"
      }
    >
      {children}
    </section>
  );
};

export default StandardSection;
