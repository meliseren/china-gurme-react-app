import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            // Giriş bilgilerini doğrula ve isAuthenticated değerini true yap
            localStorage.setItem('isAuthenticated', 'true');
            // Yönlendirme yap
            navigate('/products-edit');
        } else {
            alert('Kullanıcı adı veya şifre yanlış');
        }
    };

    return (
        <div className="login-container">
            <p>Giriş Yap</p>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input">
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-input">
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn login-btn">Giriş Yap</button>
            </form>
        </div>
    );
}

export default Login;
