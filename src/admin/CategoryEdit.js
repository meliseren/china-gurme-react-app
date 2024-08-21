import React, { useState, useEffect } from 'react';
import { faFolderPlus, faSave, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Modal from './components/modals/Modal';
import { useLocation } from 'react-router-dom';

// Buttons Component Import
import AddButton from './components/buttons/AddButton';
import DeleteButton from './components/buttons/DeleteButton';
import EditButton from './components/buttons/EditButton';
import InnerButton from './components/buttons/InnerButton';
import CloseButton from './components/buttons/CloseButton';

const CategoryEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    const [state, setState] = useState({
        categories: [],
        newCategoryName: '',
        newCategoryOrder: '',
        addNewCategoryNameModal: false,
        deleteWarning: false,
        categoryToDelete: null,
        editingCategory: null
    });

    const { categories, newCategoryName, newCategoryOrder, addNewCategoryNameModal, deleteWarning, categoryToDelete, editingCategory } = state;

    // Bileşen yüklendiğinde sunucudan kategori verilerini alır, sıralar ve bunu state'e kaydeder
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3030/jsondata');
                const data = await response.json();
                setState(prevState => ({
                    ...prevState,
                    categories: data.categories.sort((a, b) => a.order - b.order)
                }));
            } catch (error) {
                console.error('Error fetching categroies:', error)
            }
        };
        fetchCategories();
    }, [categoryId]);

    // Modalı açmak için state'i true olarak ayarlar.
    const handleAddCategory = () => {
        setState(prevState => ({
            ...prevState,
            editingCategory: null,
            addNewCategoryNameModal: true
        }));
    }

    // Input alanların boş olup olmadığını ve aynı olup olmadığını kontrol edip yeni bir kategori oluşturur ve listeye sırası ile ekler
    const handleAddCategoryName = () => {
        if (newCategoryName.trim() !== '' && newCategoryOrder.toString().trim() !== '') {
            const order = newCategoryOrder
            const nameExists = categories.some(category => category.name === newCategoryName && category.id !== (editingCategory?.id || ''));
            const orderExists = categories.some(category => category.order === order && category.id !== (editingCategory?.id || ''));

            if (nameExists) {
                alert('Bu kategori adı zaten mevcut, lütfen farklı bir kategori adı girin.');
            } else if (orderExists) {
                alert('Bu sıraya ait kategori mevcut, lütfen ürün sırasını değiştirin.');
            } else {
                const categoryData = {
                    name: newCategoryName,
                    order: order
                };

                if (editingCategory) {
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
                            setState(prevState => ({
                                ...prevState,
                                categories: updatedCategories
                            }));
                            handleCloseModal();
                        })
                        .catch((error) => {
                            console.error('Error updating category:', error);
                        });
                } else {
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
                            setState(prevState => ({
                                ...prevState,
                                categories: updatedCategories
                            }));
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
        setState(prevState => ({
            ...prevState,
            addNewCategoryNameModal: false,
            deleteWarning: false,
            newCategoryName: '',
            newCategoryOrder: ''
        }));
    };

    // Silinecek öğenin ID'sini belirler, silme uyarısını gösterir
    const handleDeleteWarning = (categoryId) => {
        setState(prevState => ({
            ...prevState,
            categoryToDelete: categoryId,
            deleteWarning: true
        }));
    }

    // Eğer kategori ID'si null değilse, HTTP delete isteği gönderir, listeden çıkarılır, uyarı kapatılır
    const handleDeleteCategory = () => {
        if (categoryToDelete !== null) {
            fetch(`http://localhost:3030/categories/${categoryToDelete}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setState(prevState => ({
                        ...prevState,
                        categories: categories.filter(category => category.id !== categoryToDelete),
                        categoryToDelete: null,
                        deleteWarning: false
                    }));
                })
                .catch((error) => {
                    console.error('Error deleting category:', error);
                });
        }
    }

    // 'Ürünleri Gör' butonundan sayfa yönlendirmesi yapar
    const handleProductNavigate = (categoryId) => {
        navigate(`/product-edit?categoryId=${categoryId}`);
    }

    // İlgili modalı açar, kategori adını ve sırasını günceller
    const handleEditCategory = (category) => {
        setState(prevState => ({
            ...prevState,
            editingCategory: category,
            newCategoryName: category.name,
            newCategoryOrder: category.order,
            addNewCategoryNameModal: true
        }));
    }

    return (
        <div className='category-edit'>
            <p className='category-edit-title'>Kategori Düzenleme</p>
            <div className='category-edit-add-category'>
                <AddButton icon={faFolderPlus} onClick={handleAddCategory}>Kategori Ekle</AddButton>
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
                                <EditButton onClick={() => handleEditCategory(category)}>Düzenle</EditButton>
                                <InnerButton onClick={() => handleProductNavigate(category.id)}>Ürünleri Gör</InnerButton>
                                <DeleteButton onClick={() => handleDeleteWarning(category.id)}>Sil</DeleteButton>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal
                isOpen={addNewCategoryNameModal}
                title={editingCategory ? 'Kategori Güncelle' : 'Kategori Ekle'}
                icon={faFolderPlus}
                onClose={handleCloseModal}
            >
                <div className="modal-inputs">
                    <div className="modal-category-name">
                        <label>Kategori Adı :</label>
                        <input
                            type='text'
                            className='modal-input'
                            placeholder='Kategori Adı'
                            value={newCategoryName}
                            onChange={(e) => setState(prevState => ({ ...prevState, newCategoryName: e.target.value }))}
                        />
                    </div>
                    <div className="modal-category-name">
                        <label>Kategori Sırası :</label>
                        <input
                            type='number'
                            min='1'
                            className='modal-input'
                            placeholder='Kategori Sırası'
                            value={newCategoryOrder}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setState(prevState => ({ ...prevState, newCategoryOrder: value }));
                                }
                            }}
                        />
                    </div>
                </div>
                <AddButton icon={faSave} onClick={handleAddCategoryName}>{editingCategory ? 'Güncelle' : 'Kaydet'}</AddButton>
                <CloseButton onClick={handleCloseModal}>Vazgeç</CloseButton>
            </Modal>
            <Modal
                isOpen={deleteWarning}
                title='Uyarı'
                icon={faTriangleExclamation}
                onClose={handleCloseModal}
            >
                <p className='delete-modal-p'>
                    Eğer bu kategoriyi silerseniz, bu kategoriye ait ürünlerde silinecektir. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?
                </p>
                <CloseButton onClick={handleCloseModal}>Vazgeç</CloseButton>
                <DeleteButton onClick={handleDeleteCategory}>Sil</DeleteButton>
            </Modal>
        </div>
    );
};

export default CategoryEdit;