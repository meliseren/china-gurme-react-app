const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3030;
const { v4: uuidv4 } = require('uuid');

// Multer ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Yüklenen dosyaların kaydedileceği klasör
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Dosya adı oluşturma
    }
});

const upload = multer({ storage: storage });

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Statik dosyaları sunmak için
app.use('/uploads', express.static('uploads'));

// Express'in JSON ve URL-encoded gövdesini ayrıştırmasını sağlayalım
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint - Ana sayfa
app.get('/', (req, res) => {
    res.send('API is working. Go to /jsondata to see the product data and /customer to see the customer data.');
});

// Endpoint for /jsondata - db.json
app.get('/jsondata', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Error reading db.json' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint for /customer - customer.json
app.get('/customer', (req, res) => {
    fs.readFile('db/customer.json', (err, data) => {
        if (err) {
            console.error('Error reading customer.json:', err);
            return res.status(500).json({ error: 'Error reading customer.json' });
        }
        res.json(JSON.parse(data));
    });
});

// GET - Kategorileri Getirme
app.get('/categories', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Error reading db.json' });
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData.categories);
    });
});

// POST - Yeni Kategori Adı Ekleme
app.post('/categories', upload.single('image'), (req, res) => {
    console.log('İstek gövdesi:', req.body);
    console.log('İstek dosyası:', req.file);
    console.log('İstek başlıkları:', req.headers);

    if (!req.body.name || !req.body.order) {
        return res.status(400).json({ error: 'Kategori adı ve sırası gereklidir' });
    }

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            return res.status(500).json({ error: 'Dosya okuma hatası' });
        }
        try {
            let jsonData = JSON.parse(data);
            console.log('Mevcut veri:', jsonData);

            if (!jsonData.categories) {
                console.log('Kategoriler dizisi bulunamadı, yeni bir dizi oluşturuluyor.');
                jsonData.categories = [];
            }

            const newCategory = {
                id: uuidv4(),
                name: req.body.name,
                order: parseInt(req.body.order, 10),
                image: req.file ? `/uploads/${req.file.filename}` : null
            };

            console.log('Eklenecek yeni kategori:', newCategory);

            jsonData.categories.push(newCategory);

            console.log('Güncellenmiş veri:', jsonData);

            fs.writeFile('db/db.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
                if (err) {
                    console.error('Dosya yazma hatası:', err);
                    return res.status(500).json({ error: 'Dosya yazma hatası' });
                }
                console.log('Yeni kategori başarıyla eklendi:', newCategory);
                res.status(201).json(newCategory);
            });
        } catch (error) {
            console.error('İstek işleme hatası:', error);
            res.status(500).json({ error: 'Sunucu içi hata', details: error.message });
        }
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
app.put('/categories/:id', upload.single('image'), (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            return res.status(500).json({ error: 'Dosya okuma hatası' });
        }
        try {
            let jsonData = JSON.parse(data);

            const categoryIndex = jsonData.categories.findIndex(cat => cat.id === categoryId);
            if (categoryIndex === -1) {
                return res.status(404).send('Kategori bulunamadı');
            }

            if (req.file) {
                updatedCategory.image = `/uploads/${req.file.filename}`;
            } else if (!updatedCategory.image) {
                // Eğer yeni bir resim yüklenmediyse ve mevcut resim de yoksa, null olarak ayarla
                updatedCategory.image = null;
            }

            jsonData.categories[categoryIndex] = {
                ...jsonData.categories[categoryIndex],
                ...updatedCategory,
                order: parseInt(updatedCategory.order, 10)
            };

            fs.writeFile('db/db.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
                if (err) {
                    console.error('Dosya yazma hatası:', err);
                    return res.status(500).json({ error: 'Dosya yazma hatası' });
                }
                console.log('Kategori başarıyla güncellendi:', jsonData.categories[categoryIndex]);
                res.json(jsonData.categories[categoryIndex]);
            });
        } catch (error) {
            console.error('İstek işleme hatası:', error);
            res.status(500).json({ error: 'Sunucu içi hata', details: error.message });
        }
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

// Hata yakalama middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Bir şeyler yanlış gitti!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});