import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from './NavbarContext';

const Header = () => {
    const { menuItems } = useContext(NavbarContext);

    return (
        <header>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="header-icons">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <img src="./assets/images/search-icon.png" alt="Search Icon" className="icon" />
                    {/* <img src="/path/to/user-icon.svg" alt="User Icon" className="icon" />
                    <img src="/path/to/cart-icon.svg" alt="Cart Icon" className="icon" /> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;
