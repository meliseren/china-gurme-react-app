import React from 'react';

const About = () => {
    const content = localStorage.getItem('aboutContent') || 'Hakkımızda içeriği burada görünecek.';
    const image = localStorage.getItem('aboutImage');

    return (
        <div className="about">
            <div className="about-image">
                {image && <img src={image} alt="About" />}
            </div>
            <p>{content}</p>
        </div>
    );
};

export default About;
