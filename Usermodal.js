// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css'; 

const modalRoot = document.getElementById('modal-root');

const UserModal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default UserModal;
