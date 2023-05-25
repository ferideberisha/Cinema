import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./modal.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const closeModal = () => {
    const modal = document.getElementById(props.id);
    modal.classList.remove("active");
    if (props.onClose) props.onClose();
  };

  return (
    <div id={props.id} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
