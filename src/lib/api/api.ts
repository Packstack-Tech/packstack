import { WeightUnit } from "enums"
import { AuthToken } from "types/api/user"
import { User } from "types/user"
import http from "./http"

/**
 * User API endpoints
 */
export const getUserStatus = () => http.get<User>("/status")

export const loginUser = (emailOrUsername: string, password: string) =>
  http.post<AuthToken>("/login", { emailOrUsername, password })

export const registerUser = (
  username: string,
  password: string,
  email: string
) => http.post<AuthToken>("/register", { username, password, email })

export const updateUser = (
  username: string,
  default_weight_unit: WeightUnit | string
) => http.put<User>("/user", { username, default_weight_unit })

export const requestPasswordReset = (email: string) =>
  http.post<null>("request-reset", { email })

export const resetPassword = (callbackId: string, password: string) =>
  http.post<null>("/reset-password", { callbackId, password })
