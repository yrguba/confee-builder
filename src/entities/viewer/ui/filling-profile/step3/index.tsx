import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';
import AvatarEditor from '../../avatar-editor';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: (arg: { first_name?: string; last_name?: string }) => void;
    error: { firstName?: string; lastName?: string };
    setError: (arg: any) => void;
    selectFile: () => void;
    makePhoto: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
};

function FillingProfileStep3View(props: Props) {
    const { viewer, avatar, error, setError, handleSubmit, selectFile, deleteFile, makePhoto } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <div className={styles.title}>
                    <AvatarEditor avatar={avatar} deleteFile={deleteFile} selectFile={selectFile} makePhoto={makePhoto} viewer={viewer} />
                </div>
            </div>
            <div className={styles.input}>
                <Input
                    placeholder="Почта"
                    // onFocus={() => setError((prev: any) => ({ ...prev, firstName: '' }))}
                    // errorTitle={error.firstName}
                    // error={!!error.firstName}
                    // {...firstName}
                    clearIcon
                    size="xxl"
                />
            </div>
            <div className={styles.inputLastName}>
                <Input
                    placeholder="Почта"
                    // onFocus={() => setError((prev: any) => ({ ...prev, lastName: '' }))}
                    // errorTitle={error.lastName}
                    // error={!!error.lastName}
                    // {...lastName}
                    clearIcon
                    size="xxl"
                />
            </div>

            <Button
                disabled={!!error.lastName || !!error.firstName}
                // onClick={() => handleSubmit({ first_name: firstName.value, last_name: lastName.value })}
                size="xl"
            >
                Далее
            </Button>
        </div>
    );
}

export default FillingProfileStep3View;
