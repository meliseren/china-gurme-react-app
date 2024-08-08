import React, { useContext } from 'react';

const TopHeader = () => {

    return (
        <div className="top-header">
            <nav>
                <ul>
                    <li><a href='/'>Türkçe</a></li>
                    <li><a href='/'>İngilizce</a></li>
                    <li><a href='/'>Çince</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default TopHeader;
