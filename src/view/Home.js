import React from 'react';

const Home = () => {
    const content = localStorage.getItem('homeContent') || 'Home içeriği burada görünecek.';
    const image = localStorage.getItem('homeImage');

    return (
        <div>
            {image && <img src={image} alt="Home" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
            <p>{content}</p>
        </div>

    );
};

export default Home;
