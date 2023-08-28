import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FruitAPIResponse from "@/types/FruitAPIResponse";

const fetcher = async (id: number) => {
  const response = await axios.get<FruitAPIResponse>(`/api/fruit?id=${id}`);
  return response.data;
};

export default function useFetchFruit(id: number) {
  return useQuery<FruitAPIResponse>({
    queryKey: ["fruit", id],
    queryFn: () => fetcher(id),
  });
}
