import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginForm, authYup, authApi } from 'entities/auth';
import { ErrorsNames } from 'shared/enums';
import { TokenService } from 'shared/services';

type LoginFormType = authYup.LoginType;

function LoginFeature() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: yupResolver(authYup.loginSchema),
    });

    const { mutate: handleLogin, isLoading } = authApi.handleLogin();

    const onSuccess = async (response: any) => {
        const { access_token, refresh_token } = response.data;
        await TokenService.save({ access_token, refresh_token });
        window.location.href = '/main';
    };

    const onError = ({ response }: any) => {
        const currentError: string = response.data.error;
        Object.entries(ErrorsNames).forEach(([key, value]: any) => {
            if (currentError === `invalid_${key}`) {
                setError(key, { message: value });
            }
        });
    };

    const onsubmit = async (data: LoginFormType) => {
        handleLogin({ username: data.login, password: data.password }, { onSuccess, onError });
    };

    return <LoginForm register={register} handleSubmit={handleSubmit(onsubmit)} isLoading={isLoading} errors={errors} />;
}

export default LoginFeature;
