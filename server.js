const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // UUID'yi içe aktar
const app = express();
const PORT = 3030;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL'ini burada belirt
    methods: 'GET,POST,PUT,DELETE', // İzin verilen HTTP metodları
    allowedHeaders: 'Content-Type' // İzin verilen header türleri
}));

// Root endpoint - Ana sayfa
app.get('/', (req, res) => {
    res.send('API is working. Go to /products to see the product data.');
});

// GET - Verileri Getirme
app.get('/products', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const products = JSON.parse(data);
        res.json(products);
    });
});

// POST - Yeni Kategori Adı Ekleme
app.post('/categories', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {  // Dosya yolunuza dikkat edin
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const newCategory = req.body;
        newCategory.id = uuidv4(); // UUID oluştur
        jsonData.categories.push(newCategory);
        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.status(201).json(newCategory);
        });
    });
});

// DELETE - Kategori ve Ürün Silme
app.delete('/products/:id', (req, res) => {
    const categoryId = req.params.id; // UUID kullanıldığında parseInt gerekmez

    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);

        // Kategori ve o kategoriye ait ürünleri filtrele
        const updatedCategories = jsonData.categories.filter(category => category.id !== categoryId);
        const updatedProducts = jsonData.products.filter(product => product.category !== categoryId);

        // Güncellenmiş veriyi yaz
        jsonData.categories = updatedCategories;
        jsonData.products = updatedProducts;

        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.status(200).json({ message: 'Kategori ve ilgili ürünler başarıyla silindi' });
        });
    });
});

// PUT - Kategori Güncelleme
app.put('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;

    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);

        // Kategori bulun ve güncelle
        const categoryIndex = jsonData.categories.findIndex(cat => cat.id === categoryId);
        if (categoryIndex === -1) {
            return res.status(404).send('Category not found');
        }
        jsonData.categories[categoryIndex] = { ...jsonData.categories[categoryIndex], ...updatedCategory };

        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.json(jsonData.categories[categoryIndex]);
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// POST - Yeni Ürün Ekleme
app.post('/products', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const newProduct = req.body;
        newProduct.id = uuidv4(); // UUID oluştur
        jsonData.products.push(newProduct);
        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.status(201).json(newProduct);
        });
    });
});

// PUT - Ürün Güncelleme
app.put('/products/:id', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let products = JSON.parse(data);
        const productId = req.params.id;
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }
        products[productIndex] = { ...products[productIndex], ...req.body };
        fs.writeFile('db/db.json', JSON.stringify(products), err => {
            if (err) throw err;
            res.json(products[productIndex]);
        });
    });
});

// DELETE - Ürün Silme
app.delete('/products/:id', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let products = JSON.parse(data);
        const productId = req.params.id;
        products = products.filter(p => p.id !== productId);
        fs.writeFile('db/db.json', JSON.stringify(products), err => {
            if (err) throw err;
            res.status(204).send();
        });
    });
});