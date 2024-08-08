import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Style
import './App.scss';

// Components
import Topheader from './components/TopHeader';
import Header from './components/Header';
import Home from './view/Home';
import About from './view/About';
import Products from './view/Products';
import Gallery from './view/Gallery';
import Contact from './view/Contact';

// Admin Components
import Login from './admin/Login';
import AdminHome from './components/AdminHome';
import HomeEdit from './components/HomeEdit';
import AboutEdit from './components/AboutEdit';
import ProductsEdit from './components/ProductsEdit';
import GalleryEdit from './components/GalleryEdit';
import ContactEdit from './components/ContactEdit';
import { NavbarProvider } from './components/NavbarContext';

function App() {
  return (
    <Router>
      <NavbarProvider>
        <Topheader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/edit/" element={<HomeEdit />} />
          <Route path="/admin/edit/about" element={<AboutEdit />} />
          <Route path="/admin/edit/products" element={<ProductsEdit />} />
          <Route path="/admin/edit/gallery" element={<GalleryEdit />} />
          <Route path="/admin/edit/contact" element={<ContactEdit />} />
        </Routes>
      </NavbarProvider>
    </Router>
  );
}

export default App;
