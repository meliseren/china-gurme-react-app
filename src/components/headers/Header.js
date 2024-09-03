import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { menuItems } = useContext(NavbarContext);
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/sign-in');
    }
    const handleOrderClick = () => {
        navigate('/order');
    }

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
                        <FontAwesomeIcon icon={faUser} className='button-icon' /> Giriş Yap
                    </button>
                    <button className='add-basket-button' onClick={handleOrderClick}>
                        <FontAwesomeIcon icon={faBasketShopping} className='button-icon' /> Sepet
                    </button>
                </div>
            </nav>
        </header >
    );
};

export default Header;
