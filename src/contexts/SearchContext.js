import React, { createContext, useState, useEffect } from 'react';
import productsData from '../views/db/db.json';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData.products);

    useEffect(() => {
        const filtered = productsData.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm]);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredProducts }}>
            {children}
        </SearchContext.Provider>
    );
};
