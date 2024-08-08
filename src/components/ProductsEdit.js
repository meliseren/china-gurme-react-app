import React, { useState, useEffect } from 'react';

const ProductsEdit = () => {
    const [productItems, setProductItems] = useState(JSON.parse(localStorage.getItem('productItems')) || []);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState('');
    const [newImageName, setNewImageName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddImage = () => {
        if (editingIndex !== null) {
            const updatedItems = [...productItems];
            updatedItems[editingIndex] = { image: newImage, name: newImageName, price: newPrice };
            setProductItems(updatedItems);
            localStorage.setItem('productItems', JSON.stringify(updatedItems));
        } else {
            const updatedItems = [...productItems, { image: newImage, name: newImageName, price: newPrice }];
            setProductItems(updatedItems);
            localStorage.setItem('productItems', JSON.stringify(updatedItems));
        }
        handleCloseModal();
    };

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setNewImage(productItems[index].image);
            setNewImageName(productItems[index].name);
            setNewPrice(productItems[index].price);
            setEditingIndex(index);
        } else {
            setNewImage('');
            setNewImageName('');
            setNewPrice('');
            setEditingIndex(null);
        }
        setShowModal(true);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = productItems.filter((_, i) => i !== index);
        setProductItems(updatedItems);
        localStorage.setItem('productItems', JSON.stringify(updatedItems));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewImage('');
        setNewImageName('');
        setNewPrice('');
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
            <h2>Ürün Düzenle</h2>
            <button onClick={() => handleOpenModal()}>Ekle</button>
            {productItems.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '200px', marginTop: '10px' }} />
                    <p>{item.name}</p>
                    <p>{item.price} TL</p>
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
                        placeholder="Ürün Adı"
                    />
                    <input
                        type="text"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="Ürün Fiyatı"
                    />
                    <button onClick={handleAddImage}>{editingIndex !== null ? 'Güncelle' : 'Ekle'}</button>
                    <button onClick={handleCloseModal}>Kapat</button>
                </div>
            )}
        </div>
    );
};

export default ProductsEdit;
