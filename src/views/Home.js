import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const handleProductClick = () => {
        navigate('/products')
    }

    return (
        <div className='home'>
            <div className="first-banner">
                <p className='first-banner-title-1'>Lezzetin Uzak Doğu'daki Durağına Hoş Geldiniz!</p>
                <p className='first-banner-title-2'>Hong Kong Restoran</p>
                <div className="address">
                    <div className="address-text">
                        <p className='first-banner-title-3'>Adres: Bağdat Cad. Caddebostan Mah.</p>
                        <p className='first-banner-title-3'>No: 258G Kadıköy/İstanbul</p>
                    </div>
                </div>
                <p className='first-banner-title-4'>Rezervasyon: 0 (533) 731 4999</p>
            </div>
            <div className="second-banner">
                <p className='second-banner-title'>Yeni ürünlere göz atın</p>
                <button className='shop-now' onClick={handleProductClick}>Alışverişe başla</button>
            </div>
        </div>

    );
};

export default Home;
