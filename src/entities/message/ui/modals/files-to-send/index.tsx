import React, { ReactNode } from 'react';

import { UseArrayReturnType, UseFileUploaderTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Audio, Box, Button, Document, Icons, Image, Title, Video } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../shared/lib';

type Props = {
    images: UseArrayReturnType<UseFileUploaderTypes.Types.ImageFile>;
    audios: UseArrayReturnType<UseFileUploaderTypes.Types.AudioFile>;
    documents: UseArrayReturnType<UseFileUploaderTypes.Types.DocumentFile>;
    videos: UseArrayReturnType<UseFileUploaderTypes.Types.VideoFile>;
    addFiles: () => void;
    sendFiles: () => void;
    close: () => void;
    sendingError: boolean;
} & BaseTypes.Statuses;

function FilesToSendModalView(props: Props) {
    const { sendingError, loading, images, documents, audios, videos, addFiles, sendFiles, close } = props;

    const fileLength = images.length + documents.length + audios.length + videos.length;

    return (
        <Box loading={!sendingError && loading} className={styles.wrapper}>
            {sendingError && (
                <Title color="red" textAlign="center" variant="H2">
                    Ошибка отправки
                </Title>
            )}
            <div className={styles.header}>
                <Title variant="H2">{!fileLength ? 'Выбирите файлы' : `Отправить ${fileLength} ${getEnding(fileLength, ['файл', 'файла', 'файлов'])}`}</Title>
            </div>
            <div className={styles.list}>
                {images.array.length ? (
                    <Image.List
                        items={images.array.map((i) => ({
                            remove: (id) => images.deleteById(id),
                            id: i.id,
                            url: i.fileUrl,
                            height: images.array.length === 1 ? '100%' : '120px',
                            width: images.array.length === 1 ? '100%' : 'auto',
                        }))}
                    />
                ) : null}
                {audios.array.length
                    ? audios.array.map((i) => (
                          <Item key={i.id} remove={() => audios.deleteById(i.id)}>
                              <Audio url={i.fileUrl} name={i.name} size={+i.size} />
                          </Item>
                      ))
                    : null}
                {videos.array.length
                    ? videos.array.map((i) => (
                          <Item key={i.id} remove={() => videos.deleteById(i.id)}>
                              <Video.Card previewUrl={i.previewUrl} name={i.name} size={+i.size} />
                          </Item>
                      ))
                    : null}
                {documents.array.length
                    ? documents.array.map((i) => (
                          <Item key={i.id} remove={() => documents.deleteById(i.id)}>
                              <Document url={i.fileUrl} name={i.name} size={+i.size} />
                          </Item>
                      ))
                    : null}
            </div>
            <div className={styles.footer}>
                <Button variant="inherit" active width="25%" onClick={addFiles}>
                    Добавить
                </Button>
                <div className={styles.confirm}>
                    <Button variant="inherit" active onClick={close}>
                        Отмена
                    </Button>
                    <Button disabled={!fileLength} variant="inherit" active onClick={sendFiles}>
                        Отправить
                    </Button>
                </div>
            </div>
        </Box>
    );
}

function Item(props: { children: ReactNode; remove: () => void }) {
    const { children, remove } = props;
    return (
        <div className={styles.item}>
            <div className={styles.children}>{children}</div>
            <Button.Circle onClick={remove} radius={30} variant="inherit" className={styles.deleteIcon}>
                <Icons variant="delete" />
            </Button.Circle>
        </div>
    );
}

export default FilesToSendModalView;
