import { WeightUnit } from "../enums"
import { Category } from "./category"

export interface BaseUser {
  username: string
  default_weight_unit: WeightUnit
  bio?: string
  avatar_url?: string
  website_url?: string
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  settings?: object
}

export interface User extends BaseUser {
  id: number
  categories: Category[]
  createdAt: string
  updatedAt: string
}

export interface Register {
  username: string
  password: string
  email: string
}

export interface Login {
  emailOrUsername: string
  password: string
}

export interface AuthToken {
  authToken: string
}
