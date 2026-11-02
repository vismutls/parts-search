import { formatPrice } from './formatPrice';

export function priceRange(warehouses) {
    const prices = warehouses
        .map(({ price }) => price)
        .filter((price) => Number.isFinite(price) && price > 0);

    const min = prices.length ? Math.min(...prices) : null;
    const max = prices.length ? Math.max(...prices) : null;

    return min === max
        ? formatPrice(min)
        : `от ${formatPrice(min)} до ${formatPrice(max)}`;
}