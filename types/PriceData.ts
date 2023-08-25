export default interface PriceData {
  id: number;
  packs: Pack[];
}

export interface Pack {
  type: "count" | "weight";
  quantity: number;
  price: number;
  discountPrice: number;
  inStock: boolean;
}
