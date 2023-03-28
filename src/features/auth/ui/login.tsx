import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Login, authYup, AuthApi } from 'entities/auth';
import { TokenService } from 'shared/services';

type LoginFormType = authYup.LoginType;

function LoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: yupResolver(authYup.loginSchema),
    });

    const { mutate: handleLogin, isLoading } = AuthApi.handleLogin();

    const onSuccess = async (response: any) => {
        // const { access_token, refresh_token } = response.data;
        const { access_token, refresh_token } = response.data.data;
        await TokenService.save({ access_token, refresh_token });
        window.location.href = '/info';
    };

    const onError = ({ response }: any) => {
        setError('login', { message: 'Неверный логин или пароль' });
        setError('password', { message: 'Неверный логин или пароль' });
    };

    const onsubmit = async (data: LoginFormType) => {
        handleLogin({ username: data.login, password: data.password }, { onSuccess, onError });
    };

    return <Login register={register} handleSubmit={handleSubmit(onsubmit)} isLoading={isLoading} errors={errors} />;
}

export default LoginForm;
