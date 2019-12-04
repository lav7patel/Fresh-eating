import React from "react";

function Modal({ handleClose, show, children, title }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className= "close-button">
        <button onClick={handleClose}>close</button>
        </div>
      </section>
    </div>
  );
}

export default Modal;
