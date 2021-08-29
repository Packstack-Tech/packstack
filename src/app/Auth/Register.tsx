import * as React from 'react';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Button, Alert } from 'antd';
import { Formik, FormikProps, Form } from 'formik';

import { INVENTORY, LOGIN, REQUEST_RESET } from "routes";
import { RegisterSpecs } from "./types";

import { AppContext } from 'AppContext';
import { Input } from 'app/components/FormFields';
import withApi from "app/components/higher-order/with-api";

import { Box } from 'styles/common';
import { AuthWrapper, BottomTray, AuthPage } from "./styles";


const RegistrationPage: React.FC<RegisterSpecs.Props> = ({ register, history }) => {
    const [authError, setAuthError] = React.useState<boolean>(false);
    const app = React.useContext(AppContext);

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                email: ''
            }}
            onSubmit={(values, formikActions) => {
                setAuthError(false);
                register(values.username, values.password, values.email)
                    .then(resp =>
                        app.setAuthToken(resp.authToken).then(() => history.push(INVENTORY))
                    )
                    .catch(() => {
                        setAuthError(true);
                        formikActions.setSubmitting(false);
                    });
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().min(6).max(100).required('Password is required'),
                email: Yup.string().required().email('Email isn\'t valid')
            })}
        >
            {(props: FormikProps<RegisterSpecs.FormValues>) => {
                const { values, errors, setFieldValue, submitCount, isSubmitting } = props;
                const wasSubmitted = submitCount > 0;

                return (
                    <AuthPage>
                        <AuthWrapper>
                            <Box>
                                <h1>Create Account</h1>
                                {authError && (
                                    <Alert
                                        message="Username/email already registered. Please login."
                                        type="error"
                                        style={{ marginBottom: '16px' }}
                                    />
                                )}
                                <Form>
                                    <Input label="Username"
                                           value={values.username}
                                           error={wasSubmitted && !!errors.username}
                                           errorMsg={errors.username}
                                           autocomplete="off"
                                           onChange={v => setFieldValue('username', v)}/>

                                    <Input label="Email"
                                           value={values.email}
                                           error={wasSubmitted && !!errors.email}
                                           errorMsg={errors.email}
                                           autocomplete="off"
                                           onChange={v => setFieldValue('email', v)}/>

                                    <Input label="Password"
                                           value={values.password}
                                           type="password"
                                           error={wasSubmitted && !!errors.password}
                                           errorMsg={errors.password}
                                           autocomplete="off"
                                           onChange={v => setFieldValue('password', v)}/>

                                    <div style={{ marginTop: '32px' }}>
                                        <Button size="large"
                                                htmlType="submit"
                                                type="primary"
                                                block={true}
                                                disabled={isSubmitting}>
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
};

const RegisterWithApi = withApi<RegisterSpecs.ApiProps>(api => ({
    register: api.UserService.register
}))(RegistrationPage);

export default RegisterWithApi;