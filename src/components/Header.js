import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from './NavbarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

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
                    <input
                        type="text"
                        placeholder="Arama..."
                        className="search-bar"
                    />
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faUser} /> Giriş Yap
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faBasketShopping} /> Sepet
                    </button>
                </div>
            </nav>
        </header >
    );
};

export default Header;
