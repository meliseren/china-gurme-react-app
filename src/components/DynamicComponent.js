import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DynamicComponent = () => {
    const { name } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        const savedContent = localStorage.getItem(name);
        console.log(name);
        if (savedContent) {
            setContent(savedContent);
        }
    }, [name]

    );

    return (
        <div>
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <p>{content}</p>
        </div>
    );
};

export default DynamicComponent;
