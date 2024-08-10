import React, { useState, useEffect } from 'react';

import productsData from './db/db.json';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        setProducts(productsData.products);
        setCategories(productsData.categories);
        setFilteredProducts(productsData.products);
    }, []);

    //Kategori seçimi
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);

        if (categoryId === null) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === categoryId);
            setFilteredProducts(filtered);
        }
    }

    const productItems = JSON.parse(localStorage.getItem('productItems')) || [];

    return (
        <div className='products'>
            <div className='categories'>
                <ul>
                    <li onClick={() => handleCategoryClick(null)}></li>
                    {categories.map((category) => (
                        <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-json">
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product">
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
        </div>
    );
};

export default Products;
