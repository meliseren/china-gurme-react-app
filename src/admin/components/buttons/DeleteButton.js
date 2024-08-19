import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ onClick, children }) => {
    return (
        <button className={'btn delete-btn'} onClick={onClick}>
            <FontAwesomeIcon icon={faTrash} className='icon' />
            {children}
        </button>
    );
};

export default DeleteButton;
