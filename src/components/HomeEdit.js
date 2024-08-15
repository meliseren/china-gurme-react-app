import React, { useState } from 'react';
// import { NavbarContext } from './NavbarContext';

const HomeEdit = () => {
    // const { menuItems } = useContext(NavbarContext);
    const [content, setContent] = useState(localStorage.getItem('homeContent') || 'Home içeriği burada görünecek.');
    const [image, setImage] = useState(localStorage.getItem('homeImage') || '');

    const handleSave = () => {
        localStorage.setItem('homeContent', content);
        localStorage.setItem('homeImage', image);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Home Edit</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                cols="50"
            />
            <br />
            <input type="file" onChange={handleImageChange} />
            <br />
            {image && <img src={image} alt="Home" style={{ maxWidth: '200px', marginTop: '10px' }} />}
            <br />
            <button onClick={handleSave}>Kaydet</button>
        </div>
    );
};

export default HomeEdit;
