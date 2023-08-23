export default interface PriceData {
  id: number;
  packs: Pack[];
}

export interface Pack {
  type: Type;
  quantity: number;
  price: number;
  discountPrice: number;
  inStock: boolean;
}

export enum Type {
  Count = "count",
  Weight = "weight",
}
