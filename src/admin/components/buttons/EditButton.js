import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ onClick, children }) => {
    return (
        <button className={'btn edit-btn'} onClick={onClick}>
            <FontAwesomeIcon icon={faEdit} className='icon' />
            {children}
        </button>
    );
};

export default EditButton;
