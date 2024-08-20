import React, { useState, useEffect } from 'react';
import { faFolderPlus, faSave, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Modal from './components/modals/Modal';
import { useNavigate, useLocation } from 'react-router-dom';

// Buttons Component Import
import AddButton from './components/buttons/AddButton';
import CloseButton from './components/buttons/CloseButton';
import EditButton from './components/buttons/EditButton';
import DeleteButton from './components/buttons/DeleteButton';
import InnerButton from './components/buttons/InnerButton';

const ProductEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    const [state, setState] = useState({
        products: [],
        addNewProductNameModal: false,
        editingProduct: null,
        newProductName: '',
        newProductOrder: '',
        deleteWarning: false,
        productToDelete: null,
        categoryName: '',
    })

    const { products, addNewProductNameModal, editingProduct, newProductName, newProductOrder, deleteWarning, productToDelete, categoryName } = state;

    // Bileşen yüklendiğinde sunucudan ürün verilerini alır, sıralar ve state'e kaydeder
    useEffect(() => {
        fetch('http://localhost:3030/jsondata')
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.products
                    .filter(product => product.categoryId === categoryId)
                    .sort((a, b) => a.order - b.order);
                setState(prevState => ({
                    ...prevState,
                    products: filteredProducts
                }));
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [categoryId]);

    // Modal'ı açmak için state'i true olarak ayarlar
    const handleAddProduct = () => {
        setState(prevState => ({
            ...prevState,
            addNewProductNameModal: true,
            editingProduct: null,
        }));
    }

    // Input alanların boş olup olmadığını ve aynı olup olmadığını kontrol edip yeni bir ürün oluşturur ve listeye sırası ile ekler
    const handleAddProductName = () => {
        if (newProductName.trim() !== '' && newProductOrder.toString().trim() !== '') {
            const order = newProductOrder
            const nameExists = products.some(product => product.name === newProductName && product.id !== (editingProduct?.id || ''));
            const orderExists = products.some(product => product.order === order && product.id !== (editingProduct?.id || ''));

            if (nameExists) {
                alert('Bu ürün adı zaten mevcut, lütfen farklı bir ürün adı girin.');
            } else if (orderExists) {
                alert('Bu sıraya ait ürün mevcut, lütfen ürün sırasını değiştirin.')
            } else {
                const ProductData = {
                    name: newProductName,
                    order: order,
                    categoryId: categoryId
                };
                if (editingProduct) {
                    fetch(`http://localhost:3030/products/${editingProduct.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ProductData),
                    })
                        .then(response => response.json())
                        .then(updatedProduct => {
                            const updatedProducts = products.map(product =>
                                product.id === editingProduct.id ? updatedProduct : product
                            ).sort((a, b) => a.order - b.order);
                            setState(prevState => ({
                                ...prevState,
                                products: updatedProducts
                            }));
                            handleCloseModal();
                        })
                        .catch((error) => {
                            console.error('Error updating product:', error)
                        })
                } else {
                    fetch('http://localhost:3030/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ProductData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            const updatedProducts = [...products, data].sort((a, b) => a.order - b.order);
                            setState(prevState => ({
                                ...prevState,
                                products: updatedProducts
                            }));
                            handleCloseModal();
                        })
                        .catch((error) => {
                            console.error('Error adding product:', error);
                        });
                }
            }
        } else {
            alert('Ürün adı veya sırası boş olamaz!');
        }
    }

    // Modal'ı kapatır, inputları temizler
    const handleCloseModal = () => {
        setState(prevState => ({
            ...prevState,
            addNewProductNameModal: false,
            deleteWarning: false,
            newProductName: '',
            newProductOrder: '',
        }));
    }

    // Silinecek öğenin ID'sini belirler, silme uyarısını gösterir
    const handleDeleteWarning = (productId) => {
        setState(prevState => ({
            ...prevState,
            productToDelete: productId,
            deleteWarning: true
        }));
    }

    // Eğer product ID'si null değilse, HTTP delete isteği gönderir, listeden çıkarır, uyarı kapatılır
    const handleDeleteCategory = () => {
        if (productToDelete !== null) {
            fetch(`http://localhost:3030/products/${productToDelete}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setState(prevState => ({
                        ...prevState,
                        products: products.filter(product => product.id !== productToDelete),
                        productToDelete: null,
                        deleteWarning: false
                    }));
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        }
    }

    // 'Ürün Detayını Gör' butonundan sayfa yönlendirmesi yapar
    const handleProductEditNavigate = () => {
        navigate('/product-detail-edit');
    }

    // İlgili modalı açar, kategori adını ve sırasını günceller
    const handleEditProduct = (product) => {
        setState(prevState => ({
            ...prevState,
            editingProduct: product,
            newProductName: product.name,
            newProductOrder: product.order,
            addNewProductNameModal: true
        }));
    }

    return (
        <div className='category-edit'>
            <p className='category-edit-title'>Ürünleri Düzenleme</p>
            <div className='category-edit-add-category'>
                <AddButton icon={faFolderPlus} onClick={handleAddProduct} >Ürün Ekle</AddButton>
            </div>
            <div className="category-edit-list">
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <div className="category-order">
                                <p className='category-order-p'>{product.order}.</p>
                                <p>{product.name}</p>
                            </div>
                            <div className="button">
                                <EditButton onClick={() => handleEditProduct(product)}>Düzenle</EditButton>
                                <InnerButton onClick={handleProductEditNavigate}>Ürün Detayını Gör</InnerButton>
                                <DeleteButton onClick={() => handleDeleteWarning(product.id)}>Sil</DeleteButton>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal
                isOpen={addNewProductNameModal}
                title={editingProduct ? 'Ürün Güncelle' : 'Ürün Ekle'}
                icon={faFolderPlus}
                onClose={handleCloseModal}
            >
                <div className="modal-inputs">
                    <div className="modal-category-name">
                        <label>Ürün Adı :</label>
                        <input
                            type='text'
                            className='modal-input'
                            placeholder='Ürün Adı'
                            value={newProductName}
                            onChange={(e) => setState(prevState => ({ ...prevState, newProductName: e.target.value }))}
                        />
                    </div>
                    <div className="modal-category-name">
                        <label>Ürün Sırası</label>
                        <input
                            type='number'
                            min='1'
                            step='1'
                            pattern='\d*'
                            className='modal-input'
                            placeholder='Ürün Sırası'
                            value={newProductOrder}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setState(prevState => ({ ...prevState, newProductOrder: value }));
                                }
                            }}
                        />
                    </div>
                </div>
                <AddButton icon={faSave} onClick={handleAddProductName}>{editingProduct ? 'Güncelle' : 'Kaydet'}</AddButton>
                <CloseButton onClick={handleCloseModal}>Vazgeç</CloseButton>
            </Modal>
            <Modal
                isOpen={deleteWarning}
                title='Uyarı'
                icon={faTriangleExclamation}
                onClose={handleCloseModal}
            >
                <p className='delete-modal-p'>
                    Bu ürünü gerçekten silmek istiyor musunuz? Bu işlem geri alınamaz.
                </p>
                <CloseButton onClick={handleCloseModal}>Vazgeç</CloseButton>
                <DeleteButton onClick={handleDeleteCategory}>Sil</DeleteButton>
            </Modal>
        </div>
    )
}

export default ProductEdit