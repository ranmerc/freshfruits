import PriceData from "@/types/PriceData";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (id: number) => {
  const response = await axios.get<PriceData>(`/api/pricing?id=${id}`);
  return response.data;
};

export default function useFetchPrice(id: number) {
  return useQuery<PriceData>({
    queryKey: ["fruit", id],
    queryFn: () => fetcher(id),
  });
}
