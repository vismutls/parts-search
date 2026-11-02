export function formatPrice(amount) {
    const options = {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    };

    return !Number.isFinite(amount) ? '—' : amount.toLocaleString('ru-RU', options);
}