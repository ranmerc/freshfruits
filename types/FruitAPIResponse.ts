import FruitData from "./FruitData";

export default interface FruitAPIResponse {
  message: string;
  data: FruitData | null;
}
