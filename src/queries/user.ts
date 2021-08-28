import { useQuery, useMutation, useQueryClient } from "react-query"
import { useHistory } from "react-router"
import { INVENTORY } from "routes"
import {
  getUserStatus,
  loginUser,
  updateUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from "lib/api/api"
import { AuthToken } from "types/api/user"
import { WeightUnit } from "enums"
import { User } from "types/user"

const USER_QUERY = "user-query"
export const useUserQuery = () => {
  const history = useHistory()
  return useQuery(
    USER_QUERY,
    async () => {
      const resp = await getUserStatus()
      return resp.data
    },
    {
      onSuccess: () => {
        history.push(INVENTORY)
      },
      onError: () => {
        localStorage.removeItem("AUTH_TOKEN")
      },
      retry: 0,
      enabled: !!localStorage.getItem("AUTH_TOKEN"),
    }
  )
}

export const useUserLogin = () => {
  const queryClient = useQueryClient()
  return useMutation<
    AuthToken,
    Error,
    {
      emailOrUsername: string
      password: string
    },
    unknown
  >(
    async (params) => {
      const data = await loginUser(params.emailOrUsername, params.password)
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
  return useMutation<
    AuthToken,
    Error,
    {
      username: string
      password: string
      email: string
    },
    unknown
  >(
    async (params) => {
      const data = await registerUser(
        params.username,
        params.password,
        params.email
      )
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

export const useUserLogout = () => {
  const queryClient = useQueryClient()
  localStorage.removeItem("AUTH_TOKEN")
  queryClient.invalidateQueries(USER_QUERY)
}

export const useUpdateUser = () => {
  return useMutation<
    User,
    Error,
    {
      username: string
      default_weight_unit: WeightUnit | string
    },
    unknown
  >(async (params) => {
    const data = await updateUser(params.username, params.default_weight_unit)
    return data.data
  })
}

export const useRequestPasswordReset = () => {
  return useMutation((email: string) => requestPasswordReset(email))
}

export const useResetPassword = () => {
  return useMutation((params: { callbackId: string; password: string }) =>
    resetPassword(params.callbackId, params.password)
  )
}
