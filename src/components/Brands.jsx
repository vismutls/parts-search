import { useDispatch, useSelector } from 'react-redux';
import { searchOffers } from '../store';

import { StatusWatcher, isStatusDone } from './StatusWatcher';
import { Message } from './Message';

export function Brands() {
    const dispatch = useDispatch();
    const number = useSelector((s) => s.number);
    const brand = useSelector((s) => s.brand);
    const brands = useSelector((s) => s.brands);

    if (!isStatusDone(brands)) {
        return <StatusWatcher entity={brands} />
    }

    const names = [...new Set(brands.items.map((g) => g.brand).filter(Boolean))].sort();

    if (!names.length) {
        return <Message type="warning">По артикулу «{number}» ничего не найдено.</Message>;
    }

    return (
        <section className="card mb-5">
            <div className="card-body p-4 py-5">
                <h2 className="h5 mb-3">Выберите производителя</h2>
                <div className="d-flex flex-wrap gap-2">
                    {names.map((name) => (
                        <button
                            key={name}
                            className={`btn ${name === brand ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => dispatch(searchOffers({ number, brand: name }))}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
