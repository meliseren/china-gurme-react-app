import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const InnerButton = ({ onClick, children }) => {
    return (
        <button className={'btn inner-btn'} onClick={onClick}>
            <FontAwesomeIcon icon={faEye} className='icon' />
            {children}
        </button>
    );
};

export default InnerButton;
