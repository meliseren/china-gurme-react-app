import React, { useState } from 'react';
// import { NavbarContext } from './NavbarContext';

const AboutEdit = () => {
    // const { menuItems } = useContext(NavbarContext);
    const [content, setContent] = useState(localStorage.getItem('aboutContent') || 'Hakkımızda içeriği burada görünecek.');
    const [image, setImage] = useState(localStorage.getItem('aboutImage') || '');

    const handleSave = () => {
        localStorage.setItem('aboutContent', content);
        localStorage.setItem('aboutImage', image);
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
            <h2>About Edit</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                cols="50"
            />
            <br />
            <input type="file" onChange={handleImageChange} />
            <br />
            {image && <img src={image} alt="About" style={{ maxWidth: '200px', marginTop: '10px' }} />}
            <br />
            <button onClick={handleSave}>Kaydet</button>
        </div>
    );
};

export default AboutEdit;
