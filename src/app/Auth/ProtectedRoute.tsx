import * as React from "react"
import { Redirect, Route } from "react-router"
import { useUserQuery } from "queries/user"

import { LOGIN } from "routes"

interface ProtectedProps {
  component: React.ComponentType<any>
  path: string
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ component, path }) => {
  const user = useUserQuery()

  if (user.isLoading) {
    return null
  }

  if (user.data) {
    return <Route path={path} component={component} />
  }

  return <Redirect to={LOGIN} />
}

export default ProtectedRoute
