import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import './Cart.css'; // Подключаем стиль

const Cart = ({ cart, removeFromCart, setCart}) => {
    const navigate = useNavigate(); // Хук для редиректа

        // Функция для отправки заказа на сервер
        const handleOrder = async () => {
            const orderData = {
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    additives: item.selectedAdditives.map(additive => ({
                        id: additive.id,
                        name: additive.name
                    }))
                }))
            };

            try {
                const response = await fetch('/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    // Очистка корзины после успешного оформления
                    setCart([]);
                    navigate('/checkout'); // Перенаправление на страницу оформления
                } else {
                    alert('Ошибка при отправке заказа');
                }
            } catch (error) {
                console.error('Ошибка при отправке заказа:', error);
                alert('Произошла ошибка. Попробуйте позже.');
            }
        };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Корзина</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Корзина пуста</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-card">
                            <img src={item.image || `${process.env.PUBLIC_URL}/coffee.png`} alt={item.name} className="cart-image" />
                            <div className="cart-card-content">
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                                {item.selectedAdditives?.length > 0 && (
                                    <div className="cart-additives">
                                        <p>Добавки:</p>
                                        <ul>
                                            {item.selectedAdditives.map((additive) => (
                                                <li key={additive.id}>{additive.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-btn">Удалить</button>
                        </div>
                    ))}
                    <div className="total">
                        <strong>
                            Общая стоимость: ${cart.reduce((total, item) => total + item.price, 0)}
                        </strong>
                    </div>
                    <button onClick={handleOrder} className="order-btn">
                        Заказать
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
