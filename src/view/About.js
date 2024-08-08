import React from 'react';

const About = () => {
    const content = localStorage.getItem('aboutContent') || 'Hakkımızda içeriği burada görünecek.';
    const image = localStorage.getItem('aboutImage');

    return (
        <div>
            {image && <img src={image} alt="About" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
            <p>{content}</p>
        </div>
    );
};

export default About;
