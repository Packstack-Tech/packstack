import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAuthToken } from "api/http"
import { getUserStatus, loginUser, updateUser, registerUser } from "api/api"
import { Login, Register, BaseUser } from "types/user"

export const USER_QUERY = "user-query"
export const useUserQuery = () => {
  return useQuery(
    USER_QUERY,
    async () => {
      const resp = await getUserStatus()
      return resp.data
    },
    {
      onError: () => {
        localStorage.removeItem("AUTH_TOKEN")
      },
      retry: 0,
      enabled: !!getAuthToken(),
    }
  )
}

export const useUserLogin = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: Login) => {
      const data = await loginUser(params)
      return data.data
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("AUTH_TOKEN", data.authToken)
        queryClient.invalidateQueries(USER_QUERY)
      },
    }
  )
}

export const useUserRegister = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: Register) => {
      const data = await registerUser(params)
      return data.data
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("AUTH_TOKEN", data.authToken)
        queryClient.invalidateQueries(USER_QUERY)
      },
    }
  )
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: BaseUser) => {
      const data = await updateUser(params)
      return data.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_QUERY)
      },
    }
  )
}
