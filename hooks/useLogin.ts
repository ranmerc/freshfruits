import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse, FormValues, SuccessResponse } from "@/types/LoginTypes";

const useLogin = () => {
  return useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await axios.post<
        FormValues,
        AxiosResponse<SuccessResponse>
      >("/api/login", values);
      return response.data.username;
    },
  });
};

export default useLogin;
