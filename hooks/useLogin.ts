import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { LoginFormValues, APIResponse } from "@/types/LoginTypes";

const useLogin = () => {
  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await axios.post<
        LoginFormValues,
        AxiosResponse<APIResponse>
      >("/api/login", values);
      return response.data.message;
    },
  });
};

export default useLogin;
