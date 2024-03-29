import {
  Item,
  CreateItem,
  UpdateItem,
  NewPackItem,
  PackItemAttr,
} from "types/item"
import { Pack, PackOverview, CreatePack, UpdatePack } from "types/pack"
import { User, BaseUser, Register, Login, AuthToken } from "types/user"
import http from "./http"

/**
 * User API endpoints
 */
export const getUserStatus = () => http.get<User>("/status")

export const loginUser = (data: Login) => http.post<AuthToken>("/login", data)

export const registerUser = (data: Register) =>
  http.post<AuthToken>("/register", data)

export const updateUser = (data: BaseUser) => http.put<User>("/user", data)

export const requestPasswordReset = (email: string) =>
  http.post<null>("request-reset", { email })

export const resetPassword = (callbackId: string, password: string) =>
  http.post<null>("/reset-password", { callbackId, password })

/**
 * Item API endpoints
 */

export const fetchItems = (id?: number) =>
  http.get<Item[]>("/item", { params: { itemId: id } })

export const createItem = (item: CreateItem) => http.post<Item>("/item", item)

export const updateItem = (item: UpdateItem) => http.put<Item>("/item", item)

export const deleteItem = (id: number) =>
  http.post<number>("/item/delete", { itemId: id })

export const uploadCsv = (file: FormData) =>
  http.post<Item[]>("/item/upload", file, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })

export const exportCsv = () => http.get<File>("/item/export")

/**
 * Pack API endpoints
 */

export const fetchPack = (id: number) => http.get<Pack>(`/pack/${id}`)

export const fetchPacks = (userId: number) =>
  http.get<PackOverview[]>(`/pack/user/${userId}`)

export const createPack = (pack: CreatePack) => http.post<Pack>("/pack", pack)

export const updatePack = (pack: UpdatePack) => http.put<Pack>("/pack", pack)

export const deletePack = (id: number) =>
  http.post<number>("/pack/delete", { packId: id })

export const addPackItem = (item: NewPackItem) =>
  http.post<PackItemAttr>("/pack/add-item", item)

export const removePackItem = (packId: number, itemId: number) =>
  http.post<number>("/pack/remove-item", { packId, itemId })

export const exportPackItems = (packId: number) =>
  http.get<File>(`/pack/export/${packId}`)

export const copyPack = (id: number) =>
  http.post<number>("/pack/copy-pack", { packId: id })
