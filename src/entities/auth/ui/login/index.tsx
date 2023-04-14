import React, { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';

import { BaseTypes } from 'shared/types';
import { Button, Input } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    register: (arg: any) => InputHTMLAttributes<HTMLInputElement>;
    handleSubmit: () => Promise<any>;
    isLoading: boolean;
    errors: FieldErrors<{ login: BaseTypes.Error; password: BaseTypes.Error }>;
};

function Login(props: Props) {
    const { register, handleSubmit, isLoading, errors } = props;

    const disabledBtn = errors.login || errors.password;

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <Input
                        title="Введите Ваш корпоративный логин"
                        errorTitle={errors.login ? String(errors.login.message) : ''}
                        size="l"
                        placeholder="Логин"
                        {...register('login')}
                        error={!!errors.login}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <Input.Password
                        title="Введите пароль"
                        errorTitle={errors.password ? String(errors.password.message) : ''}
                        size="l"
                        placeholder="Пароль"
                        {...register('password')}
                        error={!!errors.password}
                    />
                </div>
                <Button size="l" type="submit" active={!disabledBtn} disabled={!!disabledBtn} loading={isLoading}>
                    Войти
                </Button>
            </form>
        </div>
    );
}

export default Login;
