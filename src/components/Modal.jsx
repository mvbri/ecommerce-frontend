import "./css/Modal.css";

// eslint-disable-next-line react/prop-types
function Modal({ children, isOpen, closeModal }) {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <>
      <article onClick={closeModal} className={`modal ${isOpen && "is-open"} `}>
        <div className="modal-container" onClick={handleModalContainerClick}>
          <button onClick={closeModal} className="modal-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </article>
    </>
  );
}

export default Modal;
