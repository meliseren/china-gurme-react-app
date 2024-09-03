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
import SignIn from './views/SignIn';
import Order from './views/Order';

// Contexts
import { SearchProvider } from './contexts/SearchContext';
import { NavbarProvider } from './contexts/NavbarContext';

// Components
import Header from './components/headers/Header';
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
            <Route path="/" element={<> <Header /> <Home /> </>} />
            <Route path="/about" element={<> <Header /> <About /> </>} />
            <Route path="/products" element={<> <Header /><Products /></>} />
            <Route path="/contact" element={<> <Header /> <Contact /></>} />
            <Route path="/product-detail" element={<> <Header /> <ProductDetail /> </>}></Route>
            <Route path="/sign-in" element={<> <Header /> <SignIn /> </>}></Route>
            <Route path="/order" element={<> <Header /> <Order /> </>}></Route>
            {/* Admin */}
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
            <Route
              path="/product-detail-edit"
              element={
                <PrivateRoute>
                  <ProductDetailEdit />
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
