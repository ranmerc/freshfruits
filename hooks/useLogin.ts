import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormValues } from "@/components/LoginForm/LoginForm";

const useLogin = () => {
  return useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await axios.post("/api/login", values);
      return response.data.username;
    },
  });
};

export default useLogin;
