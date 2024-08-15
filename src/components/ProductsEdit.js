import React, { useState, useEffect } from 'react';

const ProductsEdit = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addNewCategoryNameModal, setAddNewCategoryNameModal] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3030/products')
            .then(response => {
                console.log('Response: ', response);
                return response.json();
            })
            .then(data => {
                console.log('Data: ', data);
                return setCategories(data.categories);
            }
            )
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleAddCategory = () => {
        setAddNewCategoryNameModal(true);
    }

    const handleAddCategoryName = () => {
        if (newCategoryName.trim() !== '') {
            const newCategory = {
                name: newCategoryName
            };

            fetch('http://localhost:3030/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            })
                .then(response => response.json())
                .then(data => {
                    setCategories([...categories, data]);
                    setNewCategoryName('');
                    setAddNewCategoryNameModal(false);
                })
                .catch((error) => {
                    console.error('Error adding category:', error);
                });
        } else {
            alert('Kategori adı boş olamaz!');
        }
    }

    const handleCloseModal = () => {
        setAddNewCategoryNameModal(false);
        setDeleteWarning(false);
    };

    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleDeleteWarning = (categoryId) => {
        setCategoryToDelete(categoryId);
        setDeleteWarning(true);
    }

    const handleDeleteCategory = () => {
        if (categoryToDelete !== null) {
            fetch(`http://localhost:3030/products`, {
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



    return (
        <div>
            <button onClick={() => handleAddCategory()}>Kategori Ekle</button>
            <div className='categories-edit'>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            {category.name}
                            <button>Düzenle</button>
                            <button onClick={() => handleDeleteWarning(category.id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>
            {addNewCategoryNameModal && (
                <div className="modal">
                    <p>Kategori Ekle</p>
                    <input
                        type="text"
                        placeholder="Kategori Adı"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button onClick={handleAddCategoryName}>Kaydet</button>
                    <button onClick={handleCloseModal}>Kapat</button>
                </div>
            )}
            {deleteWarning && (
                <div className="modal">
                    <p>Bunu yapmak istediğinize emin misiniz?</p>
                    <p>Bu işlem geri alınmayacaktır.</p>
                    <button onClick={handleDeleteCategory}>Sil</button>
                    <button onClick={handleCloseModal}>Kapat</button>
                </div>
            )}
        </div>
    );
};

export default ProductsEdit;






















































// import React, { useState, useEffect } from 'react';

// import productsData from './db/db.json';


// const ProductsEdit = () => {
//     const [categories, setCategories] = useState([]);
//     const [newCategoryName, setNewCategoryName] = useState('');
//     const [addNewCategoryNameModal, setAddNewCategoryNameModal] = useState(false);

//     useEffect(() => {
//         setCategories(productsData.categories);
//     }, []);

//     const handleAddCategory = (index = null) => {
//         if (index !== null) {
//             setNewCategoryName();
//             console.log(setNewCategoryName);
//         }
//         setAddNewCategoryNameModal(true);
//     }

//     const handleAddCategoryName = () => {
//         if (newCategoryName.trim() !== '') {
//             const newCategory = {
//                 id: categories.length + 1,
//                 name: newCategoryName
//             };

//             setCategories([...categories, newCategory]);
//             setNewCategoryName('');
//             setAddNewCategoryNameModal(false);
//         } else {
//             alert('Kategori adı boş olamaz!');
//         }
//     }

//     const handleCloseModal = () => {
//         setAddNewCategoryNameModal(false);
//     };

//     return (
//         <div>
//             <button onClick={() => handleAddCategory()}>Kategori Ekle</button>
//             <div className='categories-edit'>
//                 <ul>
//                     {categories.map((category) => (
//                         <li key={category.id} >
//                             {category.name}
//                             <button>Düzenle</button>
//                             <button>Sil</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             {
//                 addNewCategoryNameModal && (
//                     <div className="modal">
//                         <p>Kategori Ekle</p>
//                         <input
//                             type="text"
//                             placeholder="Kategori Adı"
//                             value={newCategoryName}
//                             onChange={(e) => {
//                                 setNewCategoryName(e.target.value);
//                             }}
//                         />
//                         <button onClick={handleAddCategoryName}>Kaydet</button>
//                         <button onClick={handleCloseModal}>Kapat</button>
//                     </div>
//                 )
//             }
//         </div>
//     );
// };

// export default ProductsEdit;
