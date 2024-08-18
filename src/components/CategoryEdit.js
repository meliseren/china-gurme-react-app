import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faEye, faFolderPlus, faSave, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const CategoryEdit = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryOrder, setNewCategoryOrder] = useState('');
    const [addNewCategoryNameModal, setAddNewCategoryNameModal] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    // Bileşen yüklendiğinde sunucudan ürün verilerini alır, kategorileri sıralar ve bunu state'e kaydeder
    useEffect(() => {
        fetch('http://localhost:3030/products')
            .then(response => response.json())
            .then(data => setCategories(data.categories.sort((a, b) => a.order - b.order)))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Modalı açmak için state'i true olarak ayarlar.
    const handleAddCategory = () => {
        setEditingCategory(null);
        setAddNewCategoryNameModal(true);
    }

    // Alanların boş olup olmadığını ve aynı olup olmadığını kontrol edip yeni bir kategori oluşturur ve listeye sırası ile ekler
    const handleAddCategoryName = () => {
        if (newCategoryName.trim() !== '' && newCategoryOrder.toString().trim() !== '') {
            const order = parseInt(newCategoryOrder, 10);
            const nameExists = categories.some(category => category.name === newCategoryName && category.id !== (editingCategory?.id || ''));
            const orderExists = categories.some(category => category.order === order && category.id !== (editingCategory?.id || ''));

            if (nameExists) {
                alert('Bu kategori adı zaten mevcut, lütfen farklı bir ad girin.');
            } else if (orderExists) {
                alert('Bu sıraya ait kategori mevcut, lütfen sırasını değiştirin.');
            } else {
                const categoryData = {
                    name: newCategoryName,
                    order: order
                };

                if (editingCategory) {
                    // Update existing category
                    fetch(`http://localhost:3030/categories/${editingCategory.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(categoryData),
                    })
                        .then(response => response.json())
                        .then(updatedCategory => {
                            const updatedCategories = categories.map(category =>
                                category.id === editingCategory.id ? updatedCategory : category
                            ).sort((a, b) => a.order - b.order);
                            setCategories(updatedCategories);
                            handleCloseModal();
                        })
                        .catch((error) => {
                            console.error('Error updating category:', error);
                        });
                } else {
                    // Add new category
                    fetch('http://localhost:3030/categories', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(categoryData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            const updatedCategories = [...categories, data].sort((a, b) => a.order - b.order);
                            setCategories(updatedCategories);
                            handleCloseModal();
                        })
                        .catch((error) => {
                            console.error('Error adding category:', error);
                        });
                }
            }
        } else {
            alert('Kategori adı veya sırası boş olamaz!');
        }
    };

    // Modalı kapatır, inputları temizler
    const handleCloseModal = () => {
        setAddNewCategoryNameModal(false);
        setDeleteWarning(false);
        setNewCategoryName('');
        setNewCategoryOrder('');
    };

    // Silinecek öğenin ID'sini belirler, silme uyarısını gösterir
    const handleDeleteWarning = (categoryId) => {
        setCategoryToDelete(categoryId);
        setDeleteWarning(true);
    }

    // Eğer kategori ID'si null değilse, HTTP delete isteği gönderir, listeden çıkarılır, uyarı kapatılır
    const handleDeleteCategory = () => {
        if (categoryToDelete !== null) {
            fetch(`http://localhost:3030/products/${categoryToDelete}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setCategories(categories.filter(category => category.id !== categoryToDelete));
                    setCategoryToDelete(null);
                    setDeleteWarning(false);
                })
                .catch((error) => {
                    console.error('Error deleting category:', error);
                });
        }
    }

    // Ürünleri Gör butonundan sayfa yönlendirmesi yapar
    const handleProductEdit = () => {
        navigate('/product-edit');
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setNewCategoryOrder(category.order);
        setAddNewCategoryNameModal(true);
    }

    return (
        <div className='category-edit'>
            <p className='category-edit-title'>Kategori Düzenleme</p>
            <div className='category-edit-add-category'>
                <button onClick={() => handleAddCategory()} className='btn-add-category'>
                    <FontAwesomeIcon icon={faFolderPlus} className='icon-folder-plus' />
                    Kategori Ekle
                </button>
            </div>
            <div className='category-edit-list'>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <div className="category-order">

                                <p className='category-order-p'>{category.order}.</p>
                                <p>{category.name}</p>
                            </div>

                            <div className="button">
                                <button className='btn-edit' onClick={() => handleEditCategory(category)}>
                                    <FontAwesomeIcon icon={faEdit} className='icon-product-edit' />
                                    Düzenle
                                </button>
                                <button className='btn-eye' onClick={handleProductEdit}>
                                    <FontAwesomeIcon icon={faEye} className='icon-product-edit' />
                                    Ürünleri Gör
                                </button>
                                <button className='btn-delete' onClick={() => handleDeleteWarning(category.id)}>
                                    <FontAwesomeIcon icon={faTrash} className='icon-category-delete' />
                                    Sil
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {addNewCategoryNameModal && (
                <div className='category-edit-modal'>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className='modal'>
                        <div className="modal-title-container">
                            <FontAwesomeIcon icon={faFolderPlus} className='icon-modal-folder-plus' />
                            <p className='modal-title'>{editingCategory ? 'Kategori Güncelle' : 'Kategori Ekle'}</p>
                        </div>
                        <div className="modal-container">
                            <div className="modal-category-name">
                                <label>Kategori Adı :</label>
                                <input
                                    type='text'
                                    className='modal-input'
                                    placeholder='Kategori Adı'
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-category-order">
                                <label>Kategori Sırası :</label>
                                <input
                                    type='number'
                                    min='1'
                                    className='modal-input'
                                    placeholder='Kategori Sırası'
                                    value={newCategoryOrder}
                                    onChange={(e) => setNewCategoryOrder(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button onClick={handleAddCategoryName} className='btn-save'>
                                    <FontAwesomeIcon icon={faSave} className='icon-save' />
                                    {editingCategory ? 'Güncelle' : 'Kaydet'}
                                </button>
                                <button onClick={handleCloseModal} className='btn-close'>
                                    <FontAwesomeIcon icon={faClose} className='icon-close' />
                                    Vazgeç
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {deleteWarning && (
                <div className="category-edit-modal">
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className='modal'>
                        <div className="modal-title-container">
                            <FontAwesomeIcon icon={faTriangleExclamation} className='icon-modal-folder-plus' />
                            <p className='modal-title'>Uyarı</p>
                        </div>
                        <div className="modal-container">
                            <p className='warning-info'>
                                Eğer bu kategoriyi silerseniz, bu kategoriye ait ürünlerde silinecektir. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?
                            </p>
                            <div className="modal-buttons">
                                <button onClick={handleDeleteCategory} className='btn-delete'>
                                    <FontAwesomeIcon icon={faTrash} className='icon-delete' />
                                    Sil
                                </button>
                                <button onClick={handleCloseModal} className='btn-close'>
                                    <FontAwesomeIcon icon={faClose} className='icon-close' />
                                    Vazgeç
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default CategoryEdit;