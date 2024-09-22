import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name || !phone || !mail || !password) {
            setError('Tüm alanların dolu olduğundan emin olun.');
            return;
        }

        // try {

        // }
        navigate(`/account`);
    }

    return (
        <div className="sign-up">
            <div className="sign-up-container">
                <p className='sign-up-title'>Üye Ol</p>
                <form onSubmit={handleSignUp}>
                    <div className="input">
                        <label>İsim</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>Telefon</label>
                        <input
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>E-posta</label>
                        <input
                            type='text'
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>Şifre</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="sign-up-checkbox">
                        <input type='checkbox' />
                        <p>Üyelik Sözleşmesini kabul ediyorum.</p>
                    </div>
                    <div className="sign-up-checkbox">
                        <input type='checkbox' />
                        <p>Kişisel verilerin işlenmesine ilişkin Aydınlatma Metnini okudum.</p>
                    </div>
                    <div className="sign-up-save-button">
                        <button type='submit'>Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp