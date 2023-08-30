export default function calculateDiscount(
  discountedPrice: number,
  price: number
) {
  if (discountedPrice < 0 || price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (price === 0) {
    throw new Error("Price cannot be zero");
  }

  if (discountedPrice > price)
    throw new Error("Discounted price is higher than price");

  return Math.abs(Math.round(((price - discountedPrice) / price) * 100));
}
