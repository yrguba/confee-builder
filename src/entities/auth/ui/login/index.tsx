import React, { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';

import { baseTypes } from 'shared/types';
import { Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    register: (arg: any) => InputHTMLAttributes<HTMLInputElement>;
    handleSubmit: () => Promise<any>;
    isLoading: boolean;
    errors: FieldErrors<{ login: baseTypes.Error; password: baseTypes.Error }>;
};

function LoginForm(props: Props) {
    const { register, handleSubmit, isLoading, errors } = props;

    const disabledBtn = errors.login || errors.password;

    return (
        <form onSubmit={handleSubmit} className={styles.login}>
            <div className={styles.inputGroup}>
                <Title secondary>Введите Ваш корпоративный логин</Title>
                <Input size="l" placeholder="Логин" {...register('login')} error={!!errors.login} />
                <Title animation isError>
                    {errors.login ? String(errors.login.message) : ''}
                </Title>
            </div>

            <div className={styles.inputGroup}>
                <Title secondary>Введите пароль</Title>
                <Input.Password size="l" placeholder="Пароль" {...register('password')} error={!!errors.password} />
                <Title animation isError>
                    {errors.password ? String(errors.password.message) : ''}
                </Title>
            </div>

            <Button size="l" type="submit" active={!disabledBtn} disabled={!!disabledBtn} loading={isLoading}>
                Отправить
            </Button>
        </form>
    );
}

export default LoginForm;
