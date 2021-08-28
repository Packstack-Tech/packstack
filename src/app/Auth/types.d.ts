import { Login, Register, RequestReset, ResetPassword } from "types/api/user"
import { RouteComponentProps } from "react-router"

export declare module LoginSpecs {
  export interface ApiProps {
    login: Login
  }

  export interface FormValues {
    emailOrUsername: string
    password: string
  }

  export type Props = ApiProps & RouteComponentProps
}

export declare module RegisterSpecs {
  export interface ApiProps {
    register: Register
  }

  export interface FormValues {
    username: string
    password: string
    email: string
  }

  export type Props = ApiProps & RouteComponentProps
}

export declare module RequestResetSpecs {
  export interface ApiProps {
    requestReset: RequestReset
  }

  export interface FormValues {
    email: string
  }

  export type Props = ApiProps & RouteComponentProps
}

export declare module ResetPasswordSpecs {
  export interface ApiProps {
    resetPassword: ResetPassword
  }

  export interface FormValues {
    password: string
    confirmPassword: string
  }

  export type Props = ApiProps & RouteComponentProps<{ callbackId: string }>
}
