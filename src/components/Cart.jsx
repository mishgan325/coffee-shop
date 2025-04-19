import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
    return (
        <div>
            <h2>Корзина</h2>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                                <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>
                            Общая стоимость: ${cart.reduce((total, item) => total + item.price, 0)}
                        </strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;
