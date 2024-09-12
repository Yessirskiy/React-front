export function formatPrice(price) {
    let number = parseFloat(price);
    let formattedPrice = number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    return formattedPrice;
}