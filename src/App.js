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
import Contact from './view/Contact';
import ProductDetail from './view/ProductDetail';

// Admin Components
import Login from './admin/Login';
import ProductsEdit from './components/ProductsEdit';
import { NavbarProvider } from './components/NavbarContext';
import { SearchProvider } from './view/SearchContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <SearchProvider>
        <NavbarProvider>
          <Topheader />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/products-edit"
              element={
                <PrivateRoute>
                  <ProductsEdit />
                </PrivateRoute>
              }
            />
          </Routes>
        </NavbarProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
