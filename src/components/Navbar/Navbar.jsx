import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaShoppingCart, FaBox, FaUserShield } from 'react-icons/fa';

const Navbar = ({ cartCount, token }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Кофе</Link>
                <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/orders">
                                <FaBox className="me-2" />
                                Мои заказы
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/cart">
                                <FaShoppingCart className="me-2" />
                                Корзина ({cartCount})
                            </Link>
                        </li>
                        {!token && (  // Показываем ссылку на админ-панель, если нет токена (пользователь не через Telegram)
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">
                                    <FaUserShield className="me-2" />
                                    Админ-панель
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
