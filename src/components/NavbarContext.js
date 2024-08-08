import React, { createContext, useState } from 'react';

// Context oluşturma
export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { name: 'Anasayfa', path: '/' },
        { name: 'Hakkımızda', path: '/about' },
        { name: 'Ürünler', path: '/products' },
        { name: 'Kategoriler', path: '/gallery' },
        { name: 'İletişim', path: '/contact' },
    ]);



    const addMenuItem = (item) => {
        const updatedItems = [...menuItems, item];
        setMenuItems(updatedItems);
        localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    };

    const clearMenuItems = () => {
        localStorage.removeItem('menuItems');
        setMenuItems([]);
    };

    return (
        <NavbarContext.Provider value={{ menuItems, addMenuItem, clearMenuItems }}>
            {children}
        </NavbarContext.Provider>
    );
};
