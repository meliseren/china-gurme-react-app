import React from 'react'
import TinyMCEEditor from './components/tinyMCE/TinyMCEEditor';
import AddButton from './components/buttons/AddButton'
import EditButton from './components/buttons/EditButton'
import InnerButton from './components/buttons/InnerButton'

const ProductDetailEdit = () => {
    return (
        <div className="test">
            <AddButton>4 Adet Ürün Fototoğrafı</AddButton>
            <EditButton>Eski Fiyat, Yeni Fiyat, Menşei</EditButton>
            <InnerButton>Ürün Detay</InnerButton>
            <TinyMCEEditor />
        </div>
    )
}

export default ProductDetailEdit