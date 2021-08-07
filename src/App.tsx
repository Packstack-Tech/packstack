import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import {
  REGISTER,
  LOGIN,
  INVENTORY,
  PACK_FORM,
  PROFILE,
  REQUEST_RESET,
  RESET_PASSWORD,
} from "./routes";

import ProtectedRoute from "app/Auth/ProtectedRoute";

import { Container } from "styles/common";
import Header from "app/components/Header";
import { Sidebar, SidebarContext } from "app/components/Sidebar";

const Login = lazy(() => import("app/Auth/Login"));
const Registration = lazy(() => import("app/Auth/Register"));
const RequestReset = lazy(() => import("app/Auth/RequestReset"));
const ResetPassword = lazy(() => import("app/Auth/ResetPassword"));
const Inventory = lazy(() => import("app/Inventory"));
const PackForm = lazy(() => import("app/PackForm"));
const Profile = lazy(() => import("app/Profile"));

const App = () => (
  <Container>
    <Header />
    <SidebarContext>
      <Suspense fallback={<div style={{ flex: 1 }} />}>
        <Switch>
          <Route path={LOGIN} exact component={Login} />
          <Route path={REGISTER} component={Registration} />
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
);

export default App;
