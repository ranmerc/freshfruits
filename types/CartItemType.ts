import { Pack } from "./PriceData";

export default interface CartItemType {
  fruitId: number;
  selectedPackId: number;
  quantity: number;
  pack: Pack;
}
