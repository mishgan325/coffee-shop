import React from 'react';

const AdminAddonForm = ({ onSubmit, loading, addonName, setAddonName, addonPrice, setAddonPrice }) => (
    <div className="mb-4">
        <h3 className="mb-3">Добавление добавки</h3>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Добавление...' : 'Добавить добавку'}
            </button>
        </form>
    </div>
);

export default AdminAddonForm;
