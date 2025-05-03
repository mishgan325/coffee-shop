import React from 'react';

const AdminOrderForm = ({ onSubmit, loading }) => (
    <div className="mb-4">
        <h3 className="mb-3">Создание заказа</h3>
        <form onSubmit={onSubmit}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Создание...' : 'Создать заказ'}
            </button>
        </form>
    </div>
);

export default AdminOrderForm;
