import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            // Oturumu başlat
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('loginTime', Date.now());
            navigate('/products-edit');
        } else {
            alert('Kullanıcı adı veya şifre yanlış');
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const loginTime = localStorage.getItem('loginTime');
        const maxSessionDuration = 1000 * 60 * 2;

        if (isAuthenticated && (Date.now() - loginTime > maxSessionDuration)) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('loginTime');
            alert('Oturum süresi doldu, lütfen tekrar giriş yapın.');
            navigate('/login');
        }
    }, []);


    return (
        <div className="login-container">
            <p className="login-title">Panel Girişi</p>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-container">
                    <div className="login-input-label">
                        <FontAwesomeIcon icon={faUser} className='login-icon' />
                        <label>Kullanıcı Adı:</label>
                    </div>
                    <input
                        type="text"
                        className='login-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-input-container">
                    <div className="login-input-label">
                        <FontAwesomeIcon icon={faLock} className='login-icon' />
                        <label>Şifre:</label>
                    </div>
                    <input
                        type="password"
                        className='login-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn login-btn">
                    <FontAwesomeIcon icon={faRightToBracket} className='login-submit-icon' />
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}

export default Login;
