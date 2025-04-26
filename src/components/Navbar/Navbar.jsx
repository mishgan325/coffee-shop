import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    return (
        <nav>
            <div>
                <Link to="/">Главная</Link>
            </div>
            <div>
                <Link to="/cart">Корзина ({cartCount})</Link>
            </div>
            <div>
                <Link to="/orders">Мои заказы</Link>
            </div>
        </nav>
    );
};

export default Navbar;
