import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import productsData from './db/db.json';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const convertToUrlSlug = (text) => {
        // Türkçe karakterleri İngilizce karşılıklarına dönüştür
        const mapping = {
            'ş': 's',
            'ı': 'i',
            'ğ': 'g',
            'ü': 'u',
            'ö': 'o',
            'ç': 'c',
            'ğ': 'g',
            'ş': 's',
            'ı': 'i'
        };

        // Küçük harfe dönüştür ve Türkçe karakterleri değiştir
        return text
            .toLowerCase()
            .replace(/[şğüöçı]/g, char => mapping[char] || char)
            .replace(/\s+/g, '-')        // Boşlukları çizgi ile değiştir
            .replace(/[^\w\-]+/g, '')    // Özel karakterleri temizle
            .replace(/\-\-+/g, '-');     // Birden fazla çizgiyi tek çizgi ile değiştir
    };


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
            <div className="product">

                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>

                            <div className="product-box">
                                <Link to={`/products/${convertToUrlSlug(product.name)}`}>
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                </Link>
                                <p>Price: ${product.price}</p>
                                <button>Sepete Ekle</button>
                            </div>
                        </li>

                    ))}
                </ul>
            </div>
            {/* <div className="product">
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
            </div> */}
        </div>
    );
};

export default Products;