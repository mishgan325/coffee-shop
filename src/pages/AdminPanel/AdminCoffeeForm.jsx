import React from 'react';

const AdminCoffeeForm = ({
                             onSubmit,
                             loading,
                             coffeeName,
                             setCoffeeName,
                             coffeeDescription,
                             setCoffeeDescription,
                             coffeePrice,
                             setCoffeePrice,
                             coffeeImageUrl,
                             setCoffeeImageUrl
                         }) => (
    <div className="mb-4">
        <h3 className="mb-3">Добавление кофе</h3>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={coffeeName}
                    onChange={(e) => setCoffeeName(e.target.value)}
                    placeholder="Название"
                    required
                />
            </div>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    value={coffeeDescription}
                    onChange={(e) => setCoffeeDescription(e.target.value)}
                    placeholder="Описание"
                    rows="3"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    value={coffeePrice}
                    onChange={(e) => setCoffeePrice(e.target.value)}
                    placeholder="Цена"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={coffeeImageUrl}
                    onChange={(e) => setCoffeeImageUrl(e.target.value)}
                    placeholder="Ссылка на изображение"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Добавление...' : 'Добавить кофе'}
            </button>
        </form>
    </div>
);

export default AdminCoffeeForm;
