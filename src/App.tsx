import { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { useUserQuery } from "queries/user"

import {
  REGISTER,
  LOGIN,
  INVENTORY,
  PACK_FORM,
  PACKS,
  REQUEST_RESET,
  RESET_PASSWORD,
  SETTINGS,
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
import { Packs } from "app/Packs"
import { Settings } from "app/Settings"

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
          <ProtectedRoute path={PACKS} component={Packs} />
          <ProtectedRoute path={SETTINGS} component={Settings} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
