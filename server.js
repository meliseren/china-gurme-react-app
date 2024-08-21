const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3030;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

// Root endpoint - Ana sayfa
app.get('/', (req, res) => {
    res.send('API is working. Go to /jsondata to see the product data.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// GET - Verileri Getirme
app.get('/jsondata', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

// POST - Yeni Kategori Adı Ekleme
app.post('/categories', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const newCategory = req.body;
        newCategory.id = uuidv4();
        jsonData.categories.push(newCategory);
        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.status(201).json(newCategory);
        });
    });
});

// DELETE - Kategori ve Ürün Silme
app.delete('/categories/:id', (req, res) => {
    const categoryId = req.params.id;

    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: 'Error parsing JSON' });
        }

        // Kategori ve o kategoriye ait ürünleri filtrele
        const updatedCategories = jsonData.categories.filter(category => category.id !== categoryId);
        const updatedProducts = jsonData.products.filter(products => products.categoryId !== categoryId);

        // Güncellenmiş veriyi yaz
        jsonData.categories = updatedCategories;
        jsonData.products = updatedProducts;

        fs.writeFile('db/db.json', JSON.stringify(jsonData, null, 2), err => { // prettier format
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Error writing file' });
            }
            console.log('File successfully updated');
            res.status(200).json({ message: 'Category and related products successfully deleted' });
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

// POST - Yeni Ürün Ekleme
app.post('/products', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const newProduct = req.body;
        newProduct.id = uuidv4();
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
        const jsonData = JSON.parse(data);
        const productId = req.params.id;
        const productIndex = jsonData.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }
        jsonData.products[productIndex] = { ...jsonData.products[productIndex], ...req.body };
        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.json(jsonData.products[productIndex]);
        });
    });
});

// DELETE - Ürün Silme
app.delete('/products/:id', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const productId = req.params.id;
        jsonData.products = jsonData.products.filter(p => p.id !== productId);
        fs.writeFile('db/db.json', JSON.stringify(jsonData), err => {
            if (err) throw err;
            res.status(204).send();
        });
    });
});
