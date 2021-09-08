import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { Button } from "antd"

import { Input, Select, Textarea } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"
import { alertError, alertSuccess } from "app/components/Notifications"
import { weightUnitOptions } from "utils/form"
import { WeightUnit } from "enums"

import { useUserData } from "hooks/useUserData"
import { useUpdateUser } from "queries/user"

import { PageMiniWrapper, PageTitle, Grid, Box } from "styles/common"

type FormValues = {
  username: string
  default_weight_unit: WeightUnit
  bio: string
  website_url: string
  facebook_url: string
  twitter_url: string
  instagram_url: string
}

export const Settings = () => {
  const updateUser = useUpdateUser()
  const user = useUserData()

  return (
    <PageMiniWrapper>
      <PageTitle>
        <h1>Settings</h1>
      </PageTitle>
      <Box>
        <Formik
          initialValues={{
            username: user.username,
            default_weight_unit: user.default_weight_unit,
            bio: user.bio || "",
            website_url: user.website_url || "",
            facebook_url: user.facebook_url || "",
            twitter_url: user.twitter_url || "",
            instagram_url: user.instagram_url || "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username cannot be empty."),
          })}
          onSubmit={(values) => {
            updateUser.mutate(values, {
              onSuccess: () => {
                alertSuccess({ message: "User settings updated!" })
              },
              onError: () => {
                alertError({ message: "Unable to update user" })
              },
            })
          }}
        >
          {({
            values,
            setFieldValue,
            submitForm,
            errors,
          }: FormikProps<FormValues>) => (
            <>
              <Input
                label="Your name"
                value={values.username}
                error={!!errors.username}
                errorMsg={errors.username}
                onChange={(v) => setFieldValue("username", v)}
              />
              <Grid>
                <div className="half">
                  <Select
                    label="Default Weight Unit"
                    defaultValue={{
                      value: user.default_weight_unit,
                      label: user.default_weight_unit,
                    }}
                    options={weightUnitOptions()}
                    onChange={(option: Option<string>) =>
                      setFieldValue("default_weight_unit", option.value)
                    }
                  />
                </div>
                <div className="half">currency selector</div>
              </Grid>
              <Textarea
                label="Bio"
                value={values.bio}
                onChange={(v) => setFieldValue("bio", v)}
              />
              <Input
                label="Website url"
                value={values.website_url}
                onChange={(v) => setFieldValue("website_url", v)}
              />
              <Input
                label="Instagram url"
                value={values.instagram_url}
                onChange={(v) => setFieldValue("instagram_url", v)}
              />
              <Input
                label="Facebook url"
                value={values.facebook_url}
                onChange={(v) => setFieldValue("facebook_url", v)}
              />
              <Input
                label="Twitter url"
                value={values.twitter_url}
                onChange={(v) => setFieldValue("twitter_url", v)}
              />
              <Button
                onClick={submitForm}
                block={true}
                type="primary"
                style={{ marginTop: "16px" }}
              >
                Save
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </PageMiniWrapper>
  )
}
