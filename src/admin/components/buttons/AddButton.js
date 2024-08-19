import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({ onClick, children, icon }) => {
    return (
        <button className={'btn add-btn'} onClick={onClick}>
            {icon && <FontAwesomeIcon icon={icon} className='icon' />}
            {children}
        </button>
    );
};

export default AddButton;
