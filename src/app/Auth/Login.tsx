import { FC, useState } from "react"
import * as Yup from "yup"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Button, Alert } from "antd"
import { Formik, FormikProps, Form } from "formik"

import { INVENTORY, REQUEST_RESET, REGISTER } from "routes"

import { Input } from "app/components/FormFields"
import { useUserLogin } from "queries/user"

import { Box } from "styles/common"
import { AuthWrapper, BottomTray, AuthPage } from "./styles"

export type FormValues = {
  emailOrUsername: string
  password: string
}

export const Login: FC = () => {
  const [authError, setAuthError] = useState<boolean>(false)
  const history = useHistory()
  const userLogin = useUserLogin()

  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      onSubmit={(values, formikActions) => {
        setAuthError(false)
        userLogin.mutate(values, {
          onSuccess: () => {
            history.push(INVENTORY)
          },
          onError: () => {
            setAuthError(true)
            formikActions.setSubmitting(false)
          },
        })
      }}
      validationSchema={Yup.object().shape({
        emailOrUsername: Yup.string().required("Email or Username is required"),
        password: Yup.string().required("Password is required"),
      })}
    >
      {(props: FormikProps<FormValues>) => {
        const {
          values,
          errors,
          setFieldValue,
          submitCount,
          isSubmitting,
        } = props
        const wasSubmitted = submitCount > 0

        return (
          <AuthPage>
            <AuthWrapper>
              <Box>
                <h1>Sign In</h1>
                {authError && (
                  <Alert
                    message="Invalid email/username or password. Please try again."
                    type="error"
                    style={{ marginBottom: '16px' }}
                  />
                )}
                <Form>
                  <Input
                    label="Email/Username"
                    value={values.emailOrUsername}
                    error={wasSubmitted && !!errors.emailOrUsername}
                    errorMsg={errors.emailOrUsername}
                    autocomplete="emailOrUsername"
                    onChange={(v) => setFieldValue("emailOrUsername", v)}
                  />

                  <Input
                    label="Password"
                    value={values.password}
                    error={wasSubmitted && !!errors.password}
                    errorMsg={errors.password}
                    autocomplete="current-password"
                    onChange={(v) => setFieldValue("password", v)}
                    type="password"
                  />

                  <div style={{ marginTop: "32px" }}>
                    <Button
                      size="large"
                      type="primary"
                      block={true}
                      disabled={isSubmitting}
                      htmlType="submit"
                    >
                      Sign In
                    </Button>
                  </div>

                  <BottomTray>
                    <Link to={REGISTER}>Register</Link>
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
