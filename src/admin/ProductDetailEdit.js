import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetailEdit = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');

    const [state, setState] = useState({
        product: null,
    });

    const [selectedImage, setSelectedImage] = useState(null); // Burada tanımlanıyor

    const { product } = state;

    // Bileşen yüklendiğinde sunucudan ürün detay verilerini alır
    useEffect(() => {
        fetch('http://localhost:3030/jsondata')
            .then(response => response.json())
            .then(data => {
                const filteredProduct = data.products.find(product => product.id === productId);

                setState(prevState => ({
                    ...prevState,
                    product: filteredProduct
                }));
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [productId]);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]); // Seçilen dosyayı state'e kaydedin
    };

    const handleSaveClick = () => {
        if (selectedImage && product) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('name', product.name); // Diğer ürün verileri de eklenebilir

            fetch(`http://localhost:3030/products/${product.id}`, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(updatedProduct => {
                    setState(prevState => ({
                        ...prevState,
                        product: updatedProduct,
                        selectedImage: null, // Reset image preview
                    }));
                })
                .catch(error => console.error('Error updating product:', error));
        } else {
            alert('No image selected');
        }
    };

    return (
        <div className="product-detail-edit">
            <div className="test">
                <input
                    type="file"
                    accept="image/*"
                    style={{ marginBottom: '20px' }}
                    onChange={handleImageChange} // Burada handleImageChange işlevini kullanın
                />
                <button onClick={handleSaveClick}>Kaydet</button>
            </div>
            <ul>
                {product ? (
                    <div className="deneme">
                        <p>Name: {product.name}</p>
                        {product.image1 && (
                            <img
                                src={product.image1}
                                alt="Product" />
                        )}
                    </div>
                ) : (
                    <div>Product not found.</div>
                )}
            </ul>
        </div>
    );
};

export default ProductDetailEdit;
