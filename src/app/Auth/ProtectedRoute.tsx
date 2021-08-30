import { FC, ComponentType } from "react"
import { Redirect, Route } from "react-router"
import { useUserQuery } from "queries/user"
import Loading from "app/components/Loading"

import { LOGIN } from "routes"

interface ProtectedProps {
  component: ComponentType<any>
  path: string
}

export const ProtectedRoute: FC<ProtectedProps> = ({ component, path }) => {
  const user = useUserQuery()

  if (user.isLoading) {
    return <Loading size="large" />
  }

  if (user.data) {
    return <Route path={path} component={component} />
  }

  return <Redirect to={LOGIN} />
}
