import { useState } from 'react';
import { formatPrice } from '../utils/formatPrice';

export function WarehousesOffers({ warehouses }) {
    const [expanded, setExpanded] = useState(false);

    const availableWarehouses = warehouses.filter((warehouse) => warehouse.stock > 0);
    const visibleWarehouses = expanded
        ? availableWarehouses
        : availableWarehouses.slice(0, 3);

    return (
        <div className="card-footer bg-light p-3 p-md-4">
            <h3 className="small fw-semibold text-body-secondary mb-3">
                Наличие на складах
            </h3>

            {visibleWarehouses.map((warehouse, index) => (
                <div className="row align-items-center g-2 py-3 border-top small" key={warehouse.id || index}>
                    <div className="col-12 col-md-5 fw-medium">
                        <span>{warehouse.code || 'Склад поставщика'}</span>
                    </div>

                    <div className="col-7 col-md-4 d-flex flex-column justify-content-center">
                        <strong>{warehouse.stock} шт.</strong>

                        {warehouse.shipmentDate && (
                            <span className="d-block text-body-secondary">
                                Отгрузка {new Date(warehouse.shipmentDate).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                })}
                            </span>
                        )}
                    </div>

                    <div className="col-5 col-md-3 fw-semibold text-end text-nowrap">
                        {formatPrice(warehouse.price)}
                    </div>
                </div>
            ))}

            {availableWarehouses.length > 3 && (
                <button
                    className="btn btn-outline-primary btn-sm mt-3"
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((isExpanded) => !isExpanded)}
                >
                    {expanded
                        ? 'Скрыть'
                        : `Показать еще (${availableWarehouses.length - 3})`}
                </button>
            )}
        </div>
    );
}