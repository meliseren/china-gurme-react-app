import React from 'react';

const Products = () => {
    const productItems = JSON.parse(localStorage.getItem('productItems')) || [];

    return (
        // ürün adı, ürün fiyatı, ürün açıklaması, sepete ekle butonu, arrtırma ve azaltma
        <div className="product">
            <p>Product</p>
            {productItems.map((item, index) => (
                <div className="product-box">
                    <div key={index}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.price} TL</p>
                    </div>
                    <button>Sepete ekle</button>
                </div>

            ))}
        </div>
    );
};

export default Products;
