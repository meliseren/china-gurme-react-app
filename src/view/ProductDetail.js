// src/view/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from './db/db.json'; // JSON dosyasını import edin

const convertToUrlSlug = (text) => {
    const mapping = {
        'ş': 's',
        'ı': 'i',
        'ğ': 'g',
        'ü': 'u',
        'ö': 'o',
        'ç': 'c'
    };
    return text
        .toLowerCase()
        .replace(/[şğüöçı]/g, char => mapping[char] || char)
        .replace(/\s+/g, '-')        // Boşlukları çizgi ile değiştir
        .replace(/[^\w\-]+/g, '')    // Özel karakterleri temizle
        .replace(/\-\-+/g, '-');     // Birden fazla çizgiyi tek çizgi ile değiştir
};

const ProductDetail = () => {
    const { slug } = useParams(); // URL parametresini al
    const product = productsData.products.find(p => convertToUrlSlug(p.name) === slug);

    if (!product) return <p>Ürün bulunamadı</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>Fiyat: ${product.price}</p>
        </div>
    );
};

export default ProductDetail;
