import { useMemo } from "react"
import { Category } from "types/category"
import { useUserData } from "./useUserData"

export const useCategories = () => {
  const user = useUserData()
  return useMemo(() => user.categories as Category[], [user])
}
