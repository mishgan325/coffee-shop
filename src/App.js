import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CoffeeList from './components/CoffeeList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (coffee) => {
    setCart([...cart, coffee]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
      <Router>
        <div>
          <nav>
            <div>
              <Link to="/">Главная</Link>
            </div>
            <div>
              <Link to="/cart">Корзина ({cart.length})</Link>
            </div>
          </nav>

          <div className="container">
            <Routes>
              <Route path="/" element={<CoffeeList addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
