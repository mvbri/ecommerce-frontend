import "./css/Modal.css";

// eslint-disable-next-line react/prop-types
function Modal({ children, isOpen, closeModal }) {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <>
      <article onClick={closeModal} className={`modal ${isOpen && "is-open"} `}>
        <div className="modal-container" onClick={handleModalContainerClick}>
          <button onClick={closeModal} className="modal-close">
            x
          </button>
          {children}
        </div>
      </article>
    </>
  );
}

export default Modal;
