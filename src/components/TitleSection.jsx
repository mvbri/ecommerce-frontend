const TitleSection = ({ text, secondText, className }) => {
  return (
    <h2
      className={
        className
          ? `${className} text-2xl md:text-3xl text-center mb-8 md:mb-14 font-semibold`
          : "text-2xl md:text-3xl text-center mb-8 md:mb-14 font-semibold"
      }
    >
      {text} {""}
      <br className="md:hidden"></br>
      {secondText && <span className="text-secondary">{secondText}</span>}
    </h2>
  );
};

export default TitleSection;
