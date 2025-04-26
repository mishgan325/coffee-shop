import React, { useState } from 'react';

const CoffeeCard = ({ coffee, addToCart }) => {
    const [selectedAdditives, setSelectedAdditives] = useState([]);
    const [selectedSize, setSelectedSize] = useState(coffee.sizes?.[0]); // Размер по умолчанию

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
        });
    };


    return (
        <div className="coffee-card">
            <img className="coffee-image" src={coffee.image} alt={coffee.name} />
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>

            {coffee.sizes && (
                <div className="sizes">
                    {coffee.sizes.map((size) => (
                        <label key={size.volume}>
                            <input
                                type="radio"
                                name={`size-${coffee.id}`}
                                checked={selectedSize?.volume === size.volume}
                                onChange={() => setSelectedSize(size)}
                            />
                            {size.volume} мл — {size.price} ₽
                        </label>
                    ))}
                </div>
            )}

            {coffee.additives && coffee.additives.length > 0 && (
                <div className="additives">
                    <h4>Добавки:</h4>
                    {coffee.additives.map((additive) => (
                        <label key={additive.id}>
                            <input
                                type="checkbox"
                                value={additive.id}
                                checked={selectedAdditives.some((a) => a.id === additive.id)}
                                onChange={() => handleAdditiveChange(additive)}
                            />
                            {additive.name}
                        </label>
                    ))}
                </div>
            )}

            <button className="add-btn" onClick={handleAddToCart}>
                Добавить в корзину
            </button>
        </div>
    );
};

export default CoffeeCard;
