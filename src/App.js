import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Style
import './App.scss';

// Admin 
import Login from './admin/Login';
import CategoryEdit from './admin/CategoryEdit';
import ProductEdit from './admin/ProductEdit';
import ProductDetailEdit from './admin/ProductDetailEdit';

// Views
import Home from './views/Home';
import About from './views/About';
import Products from './views/Products';
import Contact from './views/Contact';
import ProductDetail from './views/ProductDetail';

// Contexts
import { SearchProvider } from './contexts/SearchContext';
import { NavbarProvider } from './contexts/NavbarContext';

// Components
import Header from './components/headers/Header';
import Topheader from './components/headers/TopHeader';
import PrivateRoute from './components/PrivateRoute';

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
            <Route path="/" element={<> <Topheader /> <Header /> <Home /> </>} />
            <Route path="/about" element={<><Topheader /><Header /> <About /> </>} />
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
