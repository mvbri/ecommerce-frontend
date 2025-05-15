const CardDashboard = ({ className, children }) => {
  return (
    <div
      className={
        className
          ? `${className} flex justify-evenly items-center] rounded-md p-3 py-8`
          : "flex justify-evenly items-center rounded-md p-3"
      }
    >
      {children}
    </div>
  );
};

export default CardDashboard;
