import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'antd';
import { Formik, FormikProps } from 'formik';

import { HOME } from "routes";
import { RequestResetSpecs } from "./types";

import { Input } from "app/components/FormFields";
import withApi from "app/components/higher-order/with-api";
import { alertSuccess } from "app/components/Notifications";

import { Box } from 'styles/common';
import { AuthWrapper, AuthPage } from "./styles";

const RequestReset: React.FC<RequestResetSpecs.Props> = ({ requestReset, history }) => (
    <Formik
        initialValues={{
            email: ''
        }}
        onSubmit={(values) => {
            requestReset(values.email)
                .then(() => {
                    alertSuccess({
                        message: 'Password reset email sent',
                        description: 'Check your email to finish resetting your password.'
                    });
                    history.push(HOME);
                })
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().required('Email is required')
        })}
    >
        {(props: FormikProps<RequestResetSpecs.FormValues>) => {
            const { values, errors, setFieldValue, submitForm, submitCount, isSubmitting } = props;
            const wasSubmitted = submitCount > 0;

            return (
                <AuthPage>
                    <AuthWrapper>
                        <Box>
                            <h1>Password Reset</h1>
                            <Input label="Email"
                                   value={values.email}
                                   error={wasSubmitted && !!errors.email}
                                   errorMsg={errors.email}
                                   onChange={v => setFieldValue('email', v)}/>

                            <div style={{ marginTop: '32px' }}>
                                <Button size="large"
                                        type="primary"
                                        block={true}
                                        disabled={isSubmitting}
                                        onClick={submitForm}>
                                    Reset Password
                                </Button>
                            </div>
                        </Box>
                    </AuthWrapper>
                </AuthPage>
            )
        }}
    </Formik>
);

const RequestResetWithApi = withApi<RequestResetSpecs.ApiProps>(api => ({
    requestReset: api.UserService.requestReset
}))(RequestReset);

export default RequestResetWithApi;