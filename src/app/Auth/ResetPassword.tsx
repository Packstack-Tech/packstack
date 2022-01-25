import { useState, FC } from "react"
import * as Yup from "yup"
import { Alert, Button } from "antd"
import { useHistory, useLocation, useParams } from "react-router"
import { Formik, FormikProps, Form } from "formik"

import { LOGIN } from "routes"
import { resetPassword } from "api/api"

import { Input } from "app/components/FormFields"
import { alertError, alertSuccess } from "app/components/Notifications"

import { Box } from "styles/common"
import { AuthWrapper, AuthPage } from "./styles"

export type FormValues = {
  password: string
  confirmPassword: string
}

export const ResetPassword: FC = () => {
  const history = useHistory()
  const { callbackId } = useParams<{ callbackId: string }>()
  const [matchError, setMatchError] = useState<boolean>(false)

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        resetPassword(callbackId, values.password)
          .then(() => {
            alertSuccess({ message: "Your password has been reset" })
            history.push(LOGIN)
          })
          .catch(() => {
            alertError({
              message: "An error occurred while resetting your password.",
            })
          })
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .max(100)
          .required("Password is required"),
        confirmPassword: Yup.string().required("Passwords must match"),
      })}
    >
      {(props: FormikProps<FormValues>) => {
        const { values, errors, setFieldValue, submitCount, isSubmitting } =
          props
        const wasSubmitted = submitCount > 0
        setMatchError(
          wasSubmitted && values.password !== values.confirmPassword
        )

        return (
          <AuthPage>
            <AuthWrapper>
              <Box>
                <Form>
                  <h1>Password Reset</h1>
                  {matchError && (
                    <Alert
                      message="Passwords do not match."
                      type="error"
                      style={{ marginBottom: "16px" }}
                    />
                  )}
                  <Input
                    label="New Password"
                    type="password"
                    value={values.password}
                    error={wasSubmitted && !!errors.password}
                    errorMsg={errors.password}
                    autocomplete="new-password"
                    onChange={(v) => setFieldValue("password", v)}
                  />

                  <Input
                    label="Repeat New Password"
                    type="password"
                    value={values.confirmPassword}
                    error={wasSubmitted && !!errors.confirmPassword}
                    errorMsg={errors.confirmPassword}
                    autocomplete="new-password"
                    onChange={(v) => setFieldValue("confirmPassword", v)}
                  />

                  <div style={{ marginTop: "32px" }}>
                    <Button
                      size="large"
                      type="primary"
                      block={true}
                      disabled={isSubmitting}
                      htmlType="submit"
                    >
                      Reset Password
                    </Button>
                  </div>
                </Form>
              </Box>
            </AuthWrapper>
          </AuthPage>
        )
      }}
    </Formik>
  )
}
