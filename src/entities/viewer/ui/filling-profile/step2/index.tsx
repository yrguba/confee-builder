import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useInput } from '../../../../../shared/hooks';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: (arg: { first_name?: string; last_name?: string }) => void;
    error: { firstName?: string; lastName?: string };
    setError: (arg: any) => void;
};

function FillingProfileStep2View(props: Props) {
    const { viewer, error, setError, handleSubmit } = props;

    const firstName = useInput();
    const lastName = useInput();

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Введите имя и фамилию</div>
                <div className={styles.subtitle}>Они будут отображаться другим пользователям приложения</div>
            </div>
            <div className={styles.input}>
                <Input
                    placeholder="Имя"
                    onFocus={() => setError((prev: any) => ({ ...prev, firstName: '' }))}
                    errorTitle={error.firstName}
                    error={!!error.firstName}
                    {...firstName}
                    clearIcon
                    size="xxl"
                />
            </div>
            <div className={styles.inputLastName}>
                <Input
                    placeholder="Фамилия"
                    onFocus={() => setError((prev: any) => ({ ...prev, lastName: '' }))}
                    errorTitle={error.lastName}
                    error={!!error.lastName}
                    {...lastName}
                    clearIcon
                    size="xxl"
                />
            </div>

            <Button
                disabled={!!error.lastName || !!error.firstName}
                onClick={() => handleSubmit({ first_name: firstName.value, last_name: lastName.value })}
                size="xl"
            >
                Далее
            </Button>
        </div>
    );
}

export default FillingProfileStep2View;
