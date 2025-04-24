import React from 'react';
import './Checkout.css';

const Checkout = ({ cart }) => {
    const handleCheckout = () => {
        alert('Заказ оформлен!');
    };

    return (
        <div>
            <h2>Оформление заказа</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price}</li>
                ))}
            </ul>
            <p>
                <strong>
                    Общая стоимость: ${cart.reduce((total, item) => total + item.price, 0)}
                </strong>
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>
        </div>
    );
};

export default Checkout;
