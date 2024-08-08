import React, { useState, useEffect } from 'react';

const GalleryEdit = () => {
    const [galleryItems, setGalleryItems] = useState(JSON.parse(localStorage.getItem('galleryItems')) || []);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState('');
    const [newImageName, setNewImageName] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddImage = () => {
        if (editingIndex !== null) {
            const updatedItems = [...galleryItems];
            updatedItems[editingIndex] = { image: newImage, name: newImageName };
            setGalleryItems(updatedItems);
            localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
        } else {
            const updatedItems = [...galleryItems, { image: newImage, name: newImageName }];
            setGalleryItems(updatedItems);
            localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
        }
        handleCloseModal();
    };

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setNewImage(galleryItems[index].image);
            setNewImageName(galleryItems[index].name);
            setEditingIndex(index);
        } else {
            setNewImage('');
            setNewImageName('');
            setEditingIndex(null);
        }
        setShowModal(true);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = galleryItems.filter((_, i) => i !== index);
        setGalleryItems(updatedItems);
        localStorage.setItem('galleryItems', JSON.stringify(updatedItems));

    }

    const handleCloseModal = () => {
        setShowModal(false);
        setNewImage('');
        setNewImageName('');
        setEditingIndex(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Galeri Düzenle</h2>
            <button onClick={() => handleOpenModal()}>Ekle</button>
            {galleryItems.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '200px', marginTop: '10px' }} />
                    <p>{item.name}</p>
                    <button onClick={() => handleOpenModal(index)}>Düzenle</button>
                    <button onClick={() => handleDeleteItem(index)}>Sil</button>
                </div>
            ))}
            {showModal && (
                <div className="modal">
                    <h2>{editingIndex !== null ? 'Resmi Düzenle' : 'Resim Ekle'}</h2>
                    <input type="file" onChange={handleImageChange} />
                    <input
                        type="text"
                        value={newImageName}
                        onChange={(e) => setNewImageName(e.target.value)}
                        placeholder="Resim Adı"
                    />
                    <button onClick={handleAddImage}>{editingIndex !== null ? 'Güncelle' : 'Ekle'}</button>
                    <button onClick={handleCloseModal}>Kapat</button>
                </div>
            )}
        </div>
    );
};

export default GalleryEdit;
