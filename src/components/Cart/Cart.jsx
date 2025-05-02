import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, fetchAddons } from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';

const Cart = ({ cart, removeFromCart, setCart, token }) => {
    const navigate = useNavigate();
    const [addons, setAddons] = useState([]);

    useEffect(() => {
        const loadAddons = async () => {
            try {
                const data = await fetchAddons(token);
                setAddons(data);
            } catch (error) {
                console.error('[fetchAddons] Ошибка:', error);
            }
        };
        loadAddons();
    }, [token]);

    const toggleAdditive = (cartItemId, additive) => {
        const newCart = cart.map(item => {
            if (item.cartItemId !== cartItemId) return item;

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
                coffee_id: item.coffee_id,
                addon_ids: item.selectedAdditives?.map(a => a.addon_id) || [],
            })),
        };

        try {
            const response = await createOrder(orderData.items, token);
            console.log('[createUserOrder] Ответ:', response);
            setCart([]);
            navigate('/checkout');
        } catch (error) {
            console.error('[createUserOrder] Ошибка:', error);
            alert('Ошибка при отправке заказа');
        }
    };


    console.log(cart);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Корзина</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info">Корзина пуста</div>
            ) : (
                <>
                    <div className="row g-3">
                        {cart.map((item) => (
                            <CartItem
                                key={item.cartItemId}
                                item={item}
                                addons={addons}
                                toggleAdditive={toggleAdditive}
                                removeFromCart={() => removeFromCart(item.cartItemId)}
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h5>
                            Общая стоимость: ${cart.reduce((total, item) => total + item.price, 0)}
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
