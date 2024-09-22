import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate(`/sign-up`);
    }
    return (
        <div className='sign-in'>
            <div className="sign-in-container">
                <p className='sign-in-title'>Giriş Yap</p>
                <form>
                    <div className="input">
                        <label>E-posta</label>
                        <input
                            type='text'
                        />
                    </div>
                    <div className="input">
                        <label>Şifre</label>
                        <input
                            type='password'
                        />
                    </div>
                    <div className="forgot-password">
                        <p>Şifremi unuttum</p>
                    </div>
                    <div className="sign-in-button">
                        <button type='submit'>Giriş Yap</button>
                    </div>
                </form>
                <div className="sign-up-button">
                    <p>Henüz üye değil misiniz?</p>
                    <button onClick={handleSignUpClick}>Hemen üye ol!</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn