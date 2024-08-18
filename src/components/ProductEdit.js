import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const ProductEdit = () => {
    const [addNewProductNameModal, setAddNewProductNameModal] = useState(false);

    const handleAddProduct = () => {
        setAddNewProductNameModal(true);
    }

    const handleCloseModal = {

    }

    const editingCategory = {

    }
    return (
        <div className='product-edit'>
            <p className='product-edit-title'>Ürün Düzenleme</p>
            <div className='product-edit-add-product'>
                <button onClick={handleAddProduct} className='btn-add-product'>
                    <FontAwesomeIcon icon={faFolderPlus} className='icon-folder-plus' />
                    Ürün Ekle
                </button>
            </div>
            {addNewProductNameModal && (
                <div className="product-edit-modal">
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-title-container">
                            <FontAwesomeIcon icon={faFolderPlus} className='icon-modal-folder-plus' />
                            <p className='modal-title'>{editingCategory ? 'Kategori Güncelle' : 'Kategori Ekle'}</p>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default ProductEdit