import React from 'react';

const Products = () => {
    const productItems = JSON.parse(localStorage.getItem('productItems')) || [];

    return (
        <div>
            <p>Product</p>
            {productItems.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '200px', marginTop: '10px' }} />
                    <p>{item.name}</p>
                    <p>{item.price} TL</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
