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
                             setCoffeeImageUrl,
                             isEditing,
                             onCancelEdit
                         }) => (
    <div className="mb-4">
        <h3 className="mb-3">{isEditing ? 'Редактирование кофе' : 'Добавление кофе'}</h3>
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
                />
            </div>
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (isEditing ? 'Сохранение...' : 'Добавление...') : (isEditing ? 'Сохранить' : 'Добавить кофе')}
                </button>
                {isEditing && (
                    <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    </div>
);

export default AdminCoffeeForm;
