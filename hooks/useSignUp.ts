import axios, { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { SignUpFormValues, APIResponse } from "@/types/LoginTypes";

const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: SignUpFormValues) => {
      return axios.post<SignUpFormValues, AxiosResponse<APIResponse>>(
        "/api/signup",
        values
      );
    },
  });
};

export default useSignUp;
