import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';
import AvatarEditor from '../../avatar-editor';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: (args: { email?: string; birthday?: Date }) => void;
    error: string;
    setError: (arg: any) => void;
    selectFile: () => void;
    makePhoto: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
};

function FillingProfileStep3View(props: Props) {
    const { viewer, avatar, error, setError, handleSubmit, selectFile, deleteFile, makePhoto } = props;

    const email = useInput();

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.avatar}>
                <div className={styles.title}>
                    <AvatarEditor avatar={avatar} deleteFile={deleteFile} selectFile={selectFile} makePhoto={makePhoto} viewer={viewer} />
                </div>
            </div>
            <div className={styles.input}>
                <Input placeholder="Почта" onFocus={() => setError('')} errorTitle={error} error={!!error} {...email} clearIcon size="xxl" />
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

            <Button disabled={!!error} onClick={() => handleSubmit({ email: email.value, birthday: new Date() })} size="xl">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default FillingProfileStep3View;
