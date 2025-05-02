import React from 'react';

const CartItem = ({ item, addons, toggleAdditive, removeFromCart }) => {
    const handleRemoveFromCart = () => {
        removeFromCart(item.cartItemId);
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img
                    src={item.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                    alt={item.name}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '180px', backgroundColor: '#f8f9fa' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="text-muted small mb-2">Цена: {item.price} ₽</p>

                    <div className="mb-2">
                        <p className="mb-1 fw-semibold">Добавки:</p>
                        {addons.length === 0 ? (
                            <p className="text-muted small">Нет доступных добавок</p>
                        ) : (
                            addons.map((addon) => {
                                // Нормализуем id (если он называется addon_id)
                                const normalizedAddon = {
                                    ...addon,
                                    id: addon.id ?? addon.addon_id,
                                };

                                return (
                                    <div
                                        className="form-check form-check-sm"
                                        key={`additive-${item.cartItemId}-${normalizedAddon.id}`}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`additive-${item.cartItemId}-${normalizedAddon.id}`}
                                            checked={item.selectedAdditives?.some((a) => a.id === normalizedAddon.id) || false}
                                            onChange={() => toggleAdditive(item.cartItemId, normalizedAddon)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`additive-${item.cartItemId}-${normalizedAddon.id}`}
                                        >
                                            {normalizedAddon.name} ({normalizedAddon.price}₽)
                                        </label>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="card-footer bg-white border-0 text-end">
                    <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
                        onClick={handleRemoveFromCart}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
