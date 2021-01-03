import * as React from 'react';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { Button, Alert } from 'antd';
import { Formik, FormikProps } from 'formik';

import { INVENTORY, REQUEST_RESET, REGISTER } from "routes";
import { LoginSpecs } from "./types";

import { AppContext } from 'AppContext';
import { Input } from "app/components/FormFields";
import withApi from "app/components/higher-order/with-api";

import { Box } from 'styles/common';
import { AuthWrapper, BottomTray, AuthPage } from "./styles";

const LoginPage: React.FC<LoginSpecs.Props> = ({ login, history }) => {
    const [authError, setAuthError] = React.useState<boolean>(false);
    const app = React.useContext(AppContext);

    return (
        <Formik
            initialValues={{
                emailOrUsername: '',
                password: ''
            }}
            onSubmit={(values, formikActions) => {
                setAuthError(false);
                login(values.emailOrUsername, values.password)
                    .then(resp =>
                        app.setAuthToken(resp.authToken).then(() => history.push(INVENTORY))
                    )
                    .catch(() => {
                        setAuthError(true);
                        formikActions.setSubmitting(false);
                    });
            }}
            validationSchema={Yup.object().shape({
                emailOrUsername: Yup.string().required('Email or Username is required'),
                password: Yup.string().required('Password is required')
            })}
        >
            {(props: FormikProps<LoginSpecs.FormValues>) => {
                const { values, errors, setFieldValue, submitForm, submitCount, isSubmitting } = props;
                const wasSubmitted = submitCount > 0;

                return (
                    <AuthPage>
                        <AuthWrapper>
                            <Box>
                                <h1>Sign In</h1>
                                {authError && (
                                    <Alert message="Invalid email/username or password. Please try again." type="error"/>
                                )}
                                <Input label="Email/Username"
                                       value={values.emailOrUsername}
                                       error={wasSubmitted && !!errors.emailOrUsername}
                                       errorMsg={errors.emailOrUsername}
                                       autocomplete="emailOrUsername"
                                       onChange={v => setFieldValue('emailOrUsername', v)}/>

                                <Input label="Password"
                                       value={values.password}
                                       error={wasSubmitted && !!errors.password}
                                       errorMsg={errors.password}
                                       autocomplete="current-password"
                                       onChange={v => setFieldValue('password', v)}
                                       type="password"/>

                                <div style={{ marginTop: '32px' }}>
                                    <Button size="large"
                                            type="primary"
                                            block={true}
                                            disabled={isSubmitting}
                                            onClick={submitForm}>
                                        Sign In
                                    </Button>
                                </div>

                                <BottomTray>
                                    <Link to={REGISTER}>Register</Link>
                                    <Link to={REQUEST_RESET}>Reset Password</Link>
                                </BottomTray>
                            </Box>
                        </AuthWrapper>
                    </AuthPage>
                )
            }}
        </Formik>
    )
};

const LoginWithApi = withApi<LoginSpecs.ApiProps>(api => ({
    login: api.UserService.login
}))(LoginPage);

export default LoginWithApi;
