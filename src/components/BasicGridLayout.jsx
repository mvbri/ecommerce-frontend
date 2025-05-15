import "./css/BasicGridLayout.css";

function BasicGridLayout({ className, children }) {
  return (
    <div
      className={
        className ? `${className} basic-grid-container` : "basic-grid-container"
      }
    >
      {children}
    </div>
  );
}

export default BasicGridLayout;
