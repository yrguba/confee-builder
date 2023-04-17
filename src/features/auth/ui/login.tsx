import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import OneSignal from 'react-onesignal';

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
    const { mutate: handleSendOneSignalToken } = AuthApi.handleSendOneSignalToken();

    const onSuccess = async (response: any) => {
        const { access_token, refresh_token } = response.data.data;
        await TokenService.save({ access_token, refresh_token });
        await OneSignal.init({ appId: '977e9b8a-5cf3-401b-b801-3c62e346cfde' }).then(() => {
            OneSignal.getUserId().then(async (res) => {
                res && (await handleSendOneSignalToken({ onesignal_player_id: res }));
                window.location.href = '/main/chats';
            });
        });
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
