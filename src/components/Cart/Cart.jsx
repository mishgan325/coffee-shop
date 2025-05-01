import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserOrder, fetchAddons } from '../../api/api'; // импорт API
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({ cart, removeFromCart, setCart, token }) => {
    const navigate = useNavigate();
    const [addons, setAddons] = useState([]);

    useEffect(() => {
        const loadAddons = async () => {
            try {
                const data = await fetchAddons();
                setAddons(data);
            } catch (error) {
                console.error('[fetchAddons] Ошибка:', error);
            }
        };
        loadAddons();
    }, []);

    const toggleAdditive = (coffeeId, additive) => {
        const newCart = cart.map(item => {
            if (item.id !== coffeeId) return item;

            const selected = item.selectedAdditives || [];
            const exists = selected.find(a => a.id === additive.id);

            const updatedAdditives = exists
                ? selected.filter(a => a.id !== additive.id)
                : [...selected, additive];

            return { ...item, selectedAdditives: updatedAdditives };
        });

        setCart(newCart);
    };

    const handleOrder = async () => {
        const orderData = {
            items: cart.map(item => ({
                coffee_id: item.id,
                additives: item.selectedAdditives?.map(additive => additive.id) || []
            }))
        };

        try {
            const response = await createUserOrder(orderData, token);
            console.log('[createUserOrder] Ответ:', response);

            setCart([]);
            navigate('/checkout');
        } catch (error) {
            console.error('[createUserOrder] Ошибка:', error);
            alert('Ошибка при отправке заказа');
        }
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Корзина</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info">Корзина пуста</div>
            ) : (
                <>
                    <div className="row g-3">
                        {cart.map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div className="card h-100">
                                    <img
                                        src={item.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                                        alt={item.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Цена: ${item.price}</p>

                                        <div className="mb-2">
                                            <p className="mb-1">Выбрать добавки:</p>
                                            {addons.map(additive => (
                                                <div className="form-check" key={additive.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`additive-${item.id}-${additive.id}`}
                                                        checked={item.selectedAdditives?.some(a => a.id === additive.id) || false}
                                                        onChange={() => toggleAdditive(item.id, additive)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`additive-${item.id}-${additive.id}`}
                                                    >
                                                        {additive.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-footer text-end">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h5>
                            Общая стоимость: $
                            {cart.reduce((total, item) => total + item.price, 0)}
                        </h5>
                        <button className="btn btn-success" onClick={handleOrder}>
                            Заказать
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
