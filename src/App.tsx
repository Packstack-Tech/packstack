import { lazy, Suspense } from "react"
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

import { Login } from "app/Auth/Login"
import { Register } from "app/Auth/Register"

import ProtectedRoute from "app/Auth/ProtectedRoute"

import { Container } from "styles/common"
import Header from "app/components/Header"
import { Sidebar, SidebarContext } from "app/components/Sidebar"

const RequestReset = lazy(() => import("app/Auth/RequestReset"))
const ResetPassword = lazy(() => import("app/Auth/ResetPassword"))
const Inventory = lazy(() => import("app/Inventory"))
const PackForm = lazy(() => import("app/PackForm"))
const Profile = lazy(() => import("app/Profile"))

const App = () => {
  useUserQuery()

  return (
    <div>
      <Header />
      <Container>
        <SidebarContext>
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
          <Sidebar />
        </SidebarContext>
      </Container>
    </div>
  )
}

export default App
