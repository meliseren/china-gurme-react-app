import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        categories: [],
        products: [],
        filteredProducts: [],
        selectedCategory: null,
        currentPage: 1,
        productsPerPage: 12 // Her sayfada gösterilecek ürün sayısı
    });


    const { categories, products, filteredProducts, selectedCategory, currentPage, productsPerPage } = state;

    // Bileşen yüklendiğinde kategori ve ürünleri çek
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



    const handleProductClick = (productId) => {
        navigate(`/product-detail`);
    }




    // Sayfa numarası hesaplama
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Geçerli sayfada gösterilecek ürünleri hesapla
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleCategoryClick = (categoryId) => {
        if (categoryId === null) {
            setState(prevState => ({
                ...prevState,
                filteredProducts: prevState.products,
                selectedCategory: null,
                currentPage: 1 // Kategori değiştiğinde 1. sayfaya dön
            }));
        } else {
            const filtered = products.filter(product => product.categoryId === categoryId);
            setState(prevState => ({
                ...prevState,
                filteredProducts: filtered,
                selectedCategory: categoryId,
                currentPage: 1 // Kategori değiştiğinde 1. sayfaya dön
            }));
        }
    };

    // Sayfa değiştirme
    const handlePageClick = (pageNum) => {
        setState(prevState => ({
            ...prevState,
            currentPage: pageNum
        }));
        window.scrollTo(0, 0); // Sayfa değiştiğinde sayfanın başına git
    };

    return (
        <div className="products">
            <div className="categories">
                <div className="categories-title">
                    <p className='title'>Kategoriler</p>
                </div>
                <ul>
                    <li onClick={() => handleCategoryClick(null)}>
                        <input
                            type="checkbox"
                            checked={selectedCategory === null}
                            onChange={() => handleCategoryClick(null)}
                            className='checkbox'
                        />
                        <p tabIndex="0">Tüm Ürünler</p>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
                            <input
                                type="checkbox"
                                checked={selectedCategory === category.id}
                                onChange={() => handleCategoryClick(category.id)}
                                className='checkbox'
                            />
                            <p tabIndex="0">{category.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-boxes">
                <ul>
                    {currentProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.id)}>
                            <div className="product-img">
                                <img src={product.image1} alt='image-china' />
                            </div>
                            <div className="flex-start">
                                <div className="product-name-container">
                                    <p className='product-name-p'>{product.name}</p>
                                </div>
                                <div className="price">
                                    {product.oldPrice && (
                                        <p className='old-price'>{product.oldPrice} TL</p>
                                    )}
                                    <p className='new-price'>{product.newPrice} TL</p>
                                </div>
                            </div>
                            <div className="product-add-basket">
                                <button className='add-to-cart'>{<FontAwesomeIcon icon={faShoppingBasket} />}Sepete Ekle</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageClick(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
