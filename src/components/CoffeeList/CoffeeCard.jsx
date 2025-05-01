import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CoffeeCard = ({ coffee, addToCart }) => {
    const [selectedAdditives, setSelectedAdditives] = useState([]);
    const [selectedSize, setSelectedSize] = useState(coffee.sizes?.[0] || null);

    const handleAdditiveChange = (additive) => {
        setSelectedAdditives((prev) =>
            prev.some((a) => a.id === additive.id)
                ? prev.filter((a) => a.id !== additive.id)
                : [...prev, additive]
        );
    };

    const handleAddToCart = () => {
        addToCart({
            ...coffee,
            selectedAdditives,
            price: selectedSize?.price || coffee.price, // учитываем цену от размера
        });
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={coffee.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                alt={coffee.name}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{coffee.name}</h5>
                <p className="card-text text-muted">{coffee.description}</p>

                {coffee.sizes && (
                    <div className="mb-2">
                        <strong>Размер:</strong>
                        <div className="d-flex flex-column gap-1">
                            {coffee.sizes.map((size) => (
                                <div key={size.volume} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`size-${coffee.id}`}
                                        checked={selectedSize?.volume === size.volume}
                                        onChange={() => setSelectedSize(size)}
                                        id={`size-${coffee.id}-${size.volume}`}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`size-${coffee.id}-${size.volume}`}
                                    >
                                        {size.volume} мл — {size.price} ₽
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {coffee.additives && coffee.additives.length > 0 && (
                    <div className="mb-3">
                        <strong>Добавки:</strong>
                        <div className="d-flex flex-column gap-1">
                            {coffee.additives.map((additive) => (
                                <div key={additive.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={additive.id}
                                        checked={selectedAdditives.some((a) => a.id === additive.id)}
                                        onChange={() => handleAdditiveChange(additive)}
                                        id={`additive-${coffee.id}-${additive.id}`}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`additive-${coffee.id}-${additive.id}`}
                                    >
                                        {additive.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button className="btn btn-primary mt-auto" onClick={handleAddToCart}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default CoffeeCard;
