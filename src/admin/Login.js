import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userNameErr, setUserNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [submitErr, setSubmitErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            setUserNameErr(false);
            setPasswordErr(false);
            setSubmitErr(false);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('loginTime', Date.now());
            if (username === 'melis' && password === 'melis') {
                navigate('/category-edit');
            } else {
                setSubmitErr(true);
            }

        } else {
            setUserNameErr(true);
            setPasswordErr(true);
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
        <div className="login">
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
                        />
                        {userNameErr && <p className='input-err'>**Kullanıcı adı boş olamaz!</p>}
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
                        />
                        {passwordErr && <p className='input-err'>**Şifre boş olamaz!</p>}
                    </div>
                    <button
                        type="submit"
                        className="btn login-btn"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} className='login-submit-icon' />
                        Giriş Yap
                    </button>
                    {submitErr && <p className='input-err'>**Kullanıcı adı veya şifre hatalı!</p>}
                </form>
            </div>
        </div>

    );
}

export default Login;
