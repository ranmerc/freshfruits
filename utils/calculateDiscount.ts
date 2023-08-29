export default function calculateDiscount(
  discountedPrice: number,
  price: number
) {
  return Math.abs(Math.round(((price - discountedPrice) / price) * 100));
}
