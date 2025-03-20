import "./css/Modal.css";
import FormEditProduct from "./FormEditProduct";

// eslint-disable-next-line react/prop-types
function Modal({ children, isOpen, closeModal, data, updateItem }) {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <>
      <article onClick={closeModal} className={`modal ${isOpen && "is-open"} `}>
        <div className="modal-container" onClick={handleModalContainerClick}>
          <button onClick={closeModal} className="modal-close">
            x
          </button>
          {children ? (
            children
          ) : data ? (
            <div>
              <FormEditProduct
                data={data}
                updateItem={updateItem}
                closeModal={closeModal}
              />
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}

export default Modal;
