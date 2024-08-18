import React, { useEffect } from 'react';
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
import CategoryEdit from './components/CategoryEdit';
import { NavbarProvider } from './components/NavbarContext';
import { SearchProvider } from './view/SearchContext';
import PrivateRoute from './components/PrivateRoute';
import ProductEdit from './components/ProductEdit';
import ProductDetailEdit from './components/ProductDetailEdit';

function App() {
  // Sayfa kapandığında veya yenilendiğinde oturum bilgilerini siler
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('isAuthenticated');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <SearchProvider>
        <NavbarProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Topheader />
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Topheader />
                  <Header />
                  <About />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Topheader />
                  <Header />
                  <Products />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Topheader />
                  <Header />
                  <Contact />
                </>
              }
            />
            <Route
              path="/products/:slug"
              element={
                <>
                  <Topheader />
                  <Header />
                  <ProductDetail />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/category-edit"
              element={
                <PrivateRoute>
                  <CategoryEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/product-edit"
              element={
                <PrivateRoute>
                  <ProductEdit />
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
