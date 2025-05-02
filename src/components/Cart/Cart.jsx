import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, fetchAddons } from '../../api/api';
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
                : [...selected, { ...additive, id: additive.id ?? additive.addon_id }];

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

    const totalPrice = cart.reduce((total, item) => {
        const additivePrice = (item.selectedAdditives || []).reduce((sum, a) => sum + a.price, 0);
        return total + item.price + additivePrice;
    }, 0);

    return (
        <div className="container my-4">
            <h2 className="mb-4 text-center">Корзина</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info text-center">Ваша корзина пуста</div>
            ) : (
                <>
                    <div className="row g-4">
                        {cart.map((item) => (
                            <CartItem
                                key={item.cartItemId}
                                item={item}
                                addons={addons}
                                toggleAdditive={toggleAdditive}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4 p-3 border-top">
                        <h5 className="mb-0">Итого: {totalPrice} ₽</h5>
                        <button className="btn btn-success px-4 rounded-pill" onClick={handleOrder}>
                            Оформить заказ
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
