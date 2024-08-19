import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const CloseButton = ({ onClick, children }) => {
    return (
        <button className={'btn close-btn'} onClick={onClick}>
            <FontAwesomeIcon icon={faClose} className='icon' />
            {children}
        </button>
    );
};

export default CloseButton;
