import { usersApi } from "@/api";
import { ResponseError, type CreateUserRequest, type LoginUserRequest } from "@/generated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await usersApi.getCurrentUser();
      } catch (error) {
        if (error instanceof ResponseError && error.response.status === 401) {
          return null;
        } else {
          throw error;
        }
      }
    },
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: async (loginUserRequest: LoginUserRequest) => {
      return usersApi.loginUser({ loginUserRequest });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  const { mutateAsync: logout } = useMutation({
    mutationFn: async () => {
      return usersApi.logoutUser();
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: async (createUserRequest: CreateUserRequest) => {
      await usersApi.createUser({ createUserRequest });
      return usersApi.loginUser({ loginUserRequest: createUserRequest });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
  };
});
