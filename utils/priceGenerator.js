let currentPrice  = 2129.23
const minPrice = 2050
const maxPrice = 2200
export function getLiveGoldPrice() {
    const change = Math.random() < 0.5 ? 1 : -1
    const changeAmount = Math.random() * 2.5
    currentPrice += (change * changeAmount)
    currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice))
    return currentPrice.toFixed(2)
}