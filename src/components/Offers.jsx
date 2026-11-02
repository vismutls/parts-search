import { useSelector } from 'react-redux';

import { priceRange } from '../utils/priceRange';

import { Message } from './Message';
import { StatusWatcher, isStatusDone } from './StatusWatcher';
import { WarehousesOffers } from './WarehousesOffers';

export function Offers() {
    const offers = useSelector((s) => s.offers);

    if (!isStatusDone(offers)) {
        return <StatusWatcher entity={offers} />
    }

    const products = offers.items
        .flatMap((good) => [good, ...(good.analogues || [])])
        .filter((good) => good.number);

    if (!products.length) {
        return <Message type="warning">Предложений не найдено.</Message>;
    }

    return (
        <section className="mb-4">
            <h2 className="h4 mb-3">Предложения и аналоги</h2>
            <div className="d-grid gap-3">
                {products.map((product) => {
                    const warehouses = product.warehouses || [];

                    return (
                        <article className="card" key={product.goodsID}>
                            <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
                                <div>
                                    <span className="badge text-bg-secondary mb-2">{product.brand}</span>
                                    <h3 className="h5 mb-2">{product.name || 'Наименование не указано'}</h3>
                                    <div className="small text-body-secondary">
                                        Артикул: <strong className="text-body">{product.number}</strong>
                                    </div>
                                </div>
                                <div className="text-md-end">
                                    <div className="h4 mb-1 text-primary text-nowrap">{priceRange(warehouses)}</div>
                                    <div className={`small ${product.count > 0 ? 'text-success' : 'text-body-secondary'}`}>
                                        {product.count > 0
                                            ? `${product.count} шт. в наличии`
                                            : 'Нет в наличии'}
                                    </div>
                                </div>
                            </div>

                            {warehouses.length > 0 && (
                                <WarehousesOffers warehouses={warehouses} />
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
