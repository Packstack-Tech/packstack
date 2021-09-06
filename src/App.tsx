import { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { useUserQuery } from "queries/user"

import {
  REGISTER,
  LOGIN,
  INVENTORY,
  PACK_FORM,
  PROFILE,
  REQUEST_RESET,
  RESET_PASSWORD,
} from "./routes"

import {
  Login,
  Register,
  RequestReset,
  ResetPassword,
  ProtectedRoute,
} from "app/Auth"

import { Inventory } from "app/Inventory"
import PackForm from "app/PackForm"
import { Profile } from "app/Profile"

import { Header } from "app/components/Header"

const App = () => {
  useUserQuery()

  return (
    <div>
      <Header />
      <Suspense fallback={<div style={{ flex: 1 }} />}>
        <Switch>
          <Route path={LOGIN} exact component={Login} />
          <Route path={REGISTER} component={Register} />
          <Route path={REQUEST_RESET} component={RequestReset} />
          <Route path={RESET_PASSWORD} component={ResetPassword} />
          <ProtectedRoute path={INVENTORY} component={Inventory} />
          <ProtectedRoute path={PACK_FORM} component={PackForm} />
          <ProtectedRoute path={PROFILE} component={Profile} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
