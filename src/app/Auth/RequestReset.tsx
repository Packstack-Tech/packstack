import { FC } from "react"
import * as Yup from "yup"
import { Button } from "antd"
import { useHistory } from "react-router"
import { Formik, FormikProps, Form } from "formik"

import { LOGIN } from "routes"
import { requestPasswordReset } from "api/api"

import { Input } from "app/components/FormFields"
import { alertSuccess } from "app/components/Notifications"

import { Box } from "styles/common"
import { AuthWrapper, AuthPage } from "./styles"

export type FormValues = {
  email: string
}

export const RequestReset: FC = () => {
  const history = useHistory()
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={async ({ email }) => {
        requestPasswordReset(email).then(() => {
          alertSuccess({
            message: "Password reset email sent",
            description: "Check your email to finish resetting your password.",
          })
          history.push(LOGIN)
        })
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required("Email is required"),
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
                <Form>
                  <h1>Password Reset</h1>
                  <Input
                    label="Email"
                    value={values.email}
                    error={wasSubmitted && !!errors.email}
                    errorMsg={errors.email}
                    onChange={(v) => setFieldValue("email", v)}
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
