import { FC, useState, useEffect } from "react"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

import { Button, Alert } from "antd"
import { Formik, FormikProps, Form } from "formik"

import { INVENTORY, LOGIN, REQUEST_RESET } from "routes"
import { useUserQuery, useUserRegister } from "queries/user"

import { Input } from "app/components/FormFields"

import { Box } from "styles/common"
import { AuthWrapper, BottomTray, AuthPage } from "./styles"

export type FormValues = {
  username: string
  password: string
  email: string
}

export const Register: FC = () => {
  const [authError, setAuthError] = useState<boolean>(false)
  const user = useUserQuery()
  const history = useHistory()
  const registerUser = useUserRegister()

  useEffect(() => {
    if (user.isSuccess) {
      history.push(INVENTORY)
    }
  }, [user.isSuccess, history])

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
      }}
      onSubmit={(values, formikActions) => {
        setAuthError(false)
        registerUser.mutate(values, {
          onError: () => {
            setAuthError(true)
            formikActions.setSubmitting(false)
          },
        })
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().min(6).max(100).required("Password is required"),
        email: Yup.string().required().email("Email isn't valid"),
      })}
    >
      {(props: FormikProps<FormValues>) => {
        const { values, errors, setFieldValue, submitCount, isSubmitting } =
          props
        const wasSubmitted = submitCount > 0

        return (
          <AuthPage>
            <AuthWrapper>
              <Box>
                <h1>Create Account</h1>
                {authError && (
                  <Alert
                    message="Username/email already registered. Please login."
                    type="error"
                    style={{ marginBottom: "16px" }}
                  />
                )}
                <Form>
                  <Input
                    label="Username"
                    value={values.username}
                    error={wasSubmitted && !!errors.username}
                    errorMsg={errors.username}
                    autocomplete="off"
                    onChange={(v) => setFieldValue("username", v)}
                  />

                  <Input
                    label="Email"
                    value={values.email}
                    error={wasSubmitted && !!errors.email}
                    errorMsg={errors.email}
                    autocomplete="off"
                    onChange={(v) => setFieldValue("email", v)}
                  />

                  <Input
                    label="Password"
                    value={values.password}
                    type="password"
                    error={wasSubmitted && !!errors.password}
                    errorMsg={errors.password}
                    autocomplete="off"
                    onChange={(v) => setFieldValue("password", v)}
                  />

                  <div style={{ marginTop: "32px" }}>
                    <Button
                      size="large"
                      type="primary"
                      block={true}
                      disabled={isSubmitting}
                      htmlType="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                  <BottomTray>
                    <Link to={LOGIN}>Login</Link>
                    <Link to={REQUEST_RESET}>Reset Password</Link>
                  </BottomTray>
                </Form>
              </Box>
            </AuthWrapper>
          </AuthPage>
        )
      }}
    </Formik>
  )
}
