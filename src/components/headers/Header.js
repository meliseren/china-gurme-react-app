import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { menuItems } = useContext(NavbarContext);
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/sign-in');
    };

    const handleOrderClick = () => {
        navigate('/order');
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleOverlayClick = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <nav>
                <p>Logo</p>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="header-icons">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Arama..."
                            className="search-bar"
                        />
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                    </div>
                    <button className='login-button' onClick={handleSignInClick}>
                        <FontAwesomeIcon icon={faUser} className='button-icon' />
                    </button>
                    <button className='add-basket-button' onClick={handleOrderClick}>
                        <FontAwesomeIcon icon={faShoppingCart} className='button-icon' />
                        <div className="badge">0</div>
                    </button>
                    <div className="bar-menu">
                        <FontAwesomeIcon icon={faBars} className="search-icon" onClick={handleMenuToggle} />
                    </div>
                </div>
            </nav>
            {menuOpen && (
                <div className='overlay'>
                    <div className="top-container">
                        <button className='bar-close-button' onClick={handleOverlayClick}>
                            <FontAwesomeIcon icon={faClose} className='bar-close-button' />
                        </button>
                    </div>
                    <div className="bar-search-container">
                        <input
                            type="text"
                            placeholder="Arama..."
                            className="search-bar"
                        />
                        <div className="bar-icon-container">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                    </div>
                    <ul className="overlay-menu">
                        {menuItems.map((item, index) => (
                            <li key={index} onClick={handleOverlayClick}>
                                <Link to={item.path}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="bar-button-container" onClick={handleOverlayClick}>
                        <button className='bar-login-button' onClick={handleSignInClick}>
                            <FontAwesomeIcon icon={faUser} className='button-icon' /> Giriş Yap
                        </button>
                    </div>
                    <div className="bar-button-container" onClick={handleOverlayClick}>
                        <button className='bar-login-button' onClick={handleOrderClick}>
                            <FontAwesomeIcon icon={faShoppingCart} className='button-icon' /> Sepet
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
