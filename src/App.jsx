import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBrands } from './store';

import { Brands } from './components/Brands';
import { Offers } from './components/Offers';

export default function App() {
    const dispatch = useDispatch();
    const loading = useSelector((s) => s.brands.status === 'loading');
    const [value, setValue] = useState('');

    const submit = (e) => {
        e.preventDefault();
        const number = value.trim();

        if (number) {
            dispatch(searchBrands(number));
        }
    };

    return (
        <main>
            <div className="container py-4">
                <section className="card mb-4">
                    <div className="card-body p-4">
                        <div className="col-12 col-lg-9">
                            <form className="row g-2" onSubmit={submit}>
                                <label htmlFor="part-number">Артикул детали</label>
                                <div className="col">
                                    <input
                                        id="part-number"
                                        className="form-control form-control-lg"
                                        placeholder="Например, 01089"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="col-12 col-sm-auto">
                                    <button
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading || !value.trim()}
                                    >
                                        {loading ? 'Ищем…' : 'Найти запчасть'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <Brands />
                <Offers />
            </div>
        </main>
    );
}
