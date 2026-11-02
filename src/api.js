const API_KEY = '00000000-0000-0000-0000-000000000001';

async function request(params) {
    const query = new URLSearchParams({ key: API_KEY, ...params });

    try {
        const response = await fetch(`/api/?${query}`);

        if (!response.ok) {
            throw new Error(`Сервер вернул ошибку ${response.status}`);
        }

        const data = await response.json();

        if (data?.error) {
            throw new Error(Array.isArray(data.error) ? data.error.join('; ') : data.error);
        }
        if (!Array.isArray(data?.goods)) {
            throw new Error('Некорректный ответ сервера');
        }

        return data.goods.filter((good) => good?.number);
    }
    catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Сетевая ошибка. Проверьте подключение к интернету.');
        }

        if (error instanceof SyntaxError) {
            throw new Error('Некорректный ответ сервера');
        }

        throw error;
    }
}

export function fetchGoods(number) {
    return request({ number });
}

export function fetchAnalogues(number, brand) {
    return request({ number, brand, analogues: 'on' });
}
