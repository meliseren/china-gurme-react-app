import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, title, icon, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-title">
                    <div className="modal-title-icon">
                        <FontAwesomeIcon icon={icon} className='modal-title-icon' />
                        <p className='modal-title-p'>{title}</p>
                    </div>
                    <button className='modal-close-button' onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} className='icon-close' />
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
