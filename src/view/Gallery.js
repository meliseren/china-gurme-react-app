import React from 'react';

const Gallery = () => {
    const galleryItems = JSON.parse(localStorage.getItem('galleryItems')) || [];

    return (
        <div>
            <p>Kategoriler</p>
            {galleryItems.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '200px', marginTop: '10px' }} />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
