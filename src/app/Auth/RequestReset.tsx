import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'antd';
import { Formik, FormikProps, Form } from 'formik';

import { LOGIN } from "routes";
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
                    history.push(LOGIN);
                })
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().required('Email is required')
        })}
    >
        {(props: FormikProps<RequestResetSpecs.FormValues>) => {
            const { values, errors, setFieldValue, submitCount, isSubmitting } = props;
            const wasSubmitted = submitCount > 0;

            return (
                <AuthPage>
                    <AuthWrapper>
                        <Box>
                            <Form>
                                <h1>Password Reset</h1>
                                <Input label="Email"
                                       value={values.email}
                                       error={wasSubmitted && !!errors.email}
                                       errorMsg={errors.email}
                                       onChange={v => setFieldValue('email', v)}/>

                                <div style={{ marginTop: '32px' }}>
                                    <Button size="large"
                                            htmlType="submit"
                                            type="primary"
                                            block={true}
                                            disabled={isSubmitting}>
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
);

const RequestResetWithApi = withApi<RequestResetSpecs.ApiProps>(api => ({
    requestReset: api.UserService.requestReset
}))(RequestReset);

export default RequestResetWithApi;