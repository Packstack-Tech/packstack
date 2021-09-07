import { useUserQuery } from "queries/user"
import { User } from "types/user"

export const useUserData = () => {
  const user = useUserQuery()
  return user.data as User
}
