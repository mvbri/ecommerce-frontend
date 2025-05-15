import "./css/StandardSection.css";

const StandardSection = ({ children, className }) => {
  return (
    <section
      className={
        className
          ? `${className} standard-max-w md:px-6`
          : "standard-section md:px-6"
      }
    >
      {children}
    </section>
  );
};

export default StandardSection;
