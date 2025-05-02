import React from 'react';

const CartItem = ({ item, addons, toggleAdditive, removeFromCart }) => {
    const handleRemoveFromCart = () => {
        removeFromCart(item.cartItemId);
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
                <img
                    src={item.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                    alt={item.name}
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Цена: {item.price} ₽</p>

                    <div className="mb-2">
                        <p className="mb-1">Выбрать добавки:</p>
                        {addons.map((additive) => (
                            <div className="form-check" key={`additive-${item.cartItemId}-${additive.id}`}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`additive-${item.cartItemId}-${additive.id}`}
                                    checked={item.selectedAdditives?.some((a) => a.id === additive.id) || false}
                                    onChange={() => toggleAdditive(item.cartItemId, additive)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`additive-${item.cartItemId}-${additive.id}`}
                                >
                                    {additive.name} {`(${additive.price})`}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-outline-danger btn-sm" onClick={handleRemoveFromCart}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
