import React from 'react';

const AdminAddonForm = ({
                            onSubmit,
                            loading,
                            addonName,
                            setAddonName,
                            addonPrice,
                            setAddonPrice,
                            isEditing,
                            onCancelEdit
                        }) => (
    <div className="mb-4">
        <h3 className="mb-3">{isEditing ? 'Редактирование добавки' : 'Добавление добавки'}</h3>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={addonName}
                    onChange={(e) => setAddonName(e.target.value)}
                    placeholder="Название добавки"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    value={addonPrice}
                    onChange={(e) => setAddonPrice(e.target.value)}
                    placeholder="Цена"
                    required
                />
            </div>
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Добавить добавку'}
                </button>
                {isEditing && (
                    <button type="button" className="btn btn-outline-secondary" onClick={onCancelEdit}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    </div>
);

export default AdminAddonForm;
