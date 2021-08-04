import * as React from 'react';
import * as Yup from 'yup';
import { Alert, Button } from 'antd';
import { Formik, FormikProps } from 'formik';

import { LOGIN } from "routes";
import { ResetPasswordSpecs } from "./types";

import { Input } from "app/components/FormFields";
import withApi from "app/components/higher-order/with-api";
import { alertError, alertSuccess } from "app/components/Notifications";

import { Box } from 'styles/common';
import { AuthWrapper, AuthPage } from "./styles";

const ResetPassword: React.FC<ResetPasswordSpecs.Props> = ({ resetPassword, history, match }) => {
    const [matchError, setMatchError] = React.useState<boolean>(false);

    return (
        <Formik
            initialValues={{
                callbackId: match.params.callbackId,
                password: '',
                confirmPassword: ''
            }}
            onSubmit={(values) => {
                resetPassword(values.callbackId, values.password)
                    .then(() => {
                        alertSuccess({ message: 'Your password has been reset' });
                        history.push(LOGIN);
                    })
                    .catch(() => {
                        alertError({ message: 'An error occurred while resetting your password.' })
                    })
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .max(100)
                    .required('Password is required'),
                confirmPassword: Yup.string().required('Passwords must match')
            })}
        >
            {(props: FormikProps<ResetPasswordSpecs.FormValues>) => {
                const { values, errors, setFieldValue, submitForm, submitCount, isSubmitting } = props;
                const wasSubmitted = submitCount > 0;
                setMatchError(wasSubmitted && values.password !== values.confirmPassword);

                return (
                    <AuthPage>
                        <AuthWrapper>
                            <Box>
                                <h1>Password Reset</h1>
                                {matchError && (
                                    <Alert message="Passwords do not match." type="error"
                                           style={{ marginBottom: '16px' }}/>
                                )}
                                <Input label="New Password"
                                       type="password"
                                       value={values.password}
                                       error={wasSubmitted && !!errors.password}
                                       errorMsg={errors.password}
                                       autocomplete="new-password"
                                       onChange={v => setFieldValue('password', v)}/>

                                <Input label="Repeat New Password"
                                       type="password"
                                       value={values.confirmPassword}
                                       error={wasSubmitted && !!errors.confirmPassword}
                                       errorMsg={errors.confirmPassword}
                                       autocomplete="new-password"
                                       onChange={v => setFieldValue('confirmPassword', v)}/>

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
    )
};

const ResetPasswordWithApi = withApi<ResetPasswordSpecs.ApiProps>(api => ({
    resetPassword: api.UserService.resetPassword
}))(ResetPassword);

export default ResetPasswordWithApi;