import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Products = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        categories: [],
        products: [],
        filteredProducts: []
    });

    const { categories, products, filteredProducts } = state;

    // Bileşen yüklendiğinde sunucudan kategori ve ürün verilerini alır
    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const response = await fetch('http://localhost:3030/jsondata');
                const data = await response.json();
                setState(prevState => ({
                    ...prevState,
                    categories: data.categories.sort((a, b) => a.order - b.order),
                    products: data.products,
                    filteredProducts: data.products // Başlangıçta tüm ürünleri göster
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoriesAndProducts();
    }, []);

    // Kategoriye tıklama işlemi
    const handleCategoryClick = (categoryId) => {
        if (categoryId === null) {
            // Tüm ürünleri göster
            setState(prevState => ({
                ...prevState,
                filteredProducts: prevState.products
            }));
        } else {
            // Seçilen kategoriye göre ürünleri filtrele
            const filtered = products.filter(product => product.categoryId === categoryId);
            setState(prevState => ({
                ...prevState,
                filteredProducts: filtered
            }));
        }
    };

    const handleProductClick = (productId) => {
        alert('tıklandı')
        navigate(`/product-detail`)
    }

    return (
        <div className="products">
            <div className="categories">
                <div className="categories-title">
                    <p className='title'>Kategoriler</p>
                </div>
                <ul>
                    <li onClick={() => handleCategoryClick(null)}>
                        <p>Tüm Ürünler</p>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
                            <p tabIndex="0">{category.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-boxes">
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id} onClick={(product) => handleProductClick(product)}>
                            <div className="product-img">
                                <img src={product.image1} alt='image-china' />
                            </div>
                            <div className="flex-start">
                                <p className='product-name-p'>{product.name}</p>
                                <div className="price">
                                    <p className='old-price'>{product.oldPrice} TL</p>
                                    <p className='new-price'>{product.newPrice} TL</p>
                                </div>
                            </div>
                            <div className="product-add-basket">
                                <button className='add-to-cart'>{<FontAwesomeIcon icon={faShoppingBasket} />}Sepete Ekle</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
