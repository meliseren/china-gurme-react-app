import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'a' && password === 'a') {
            navigate('/admin');
        } else {
            alert('Kullanıcı adı veya şifre yanlış');
        }
    };

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
}

export default Login;
