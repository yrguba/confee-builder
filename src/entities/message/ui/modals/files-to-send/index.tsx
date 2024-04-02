import React, { ReactNode } from 'react';

import { UseArrayReturnType, UseFileUploaderTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Audio, Box, Button, Document, Icons, Image, Title, Video } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../shared/lib';
import { appStore } from '../../../../app';
import { MessageStoreTypes } from '../../../model/store';

type Props = {
    files: MessageStoreTypes['filesToSend'];
    addFiles: () => void;
    sendFiles: () => void;
    close: () => void;
    sendingError: boolean;
} & BaseTypes.Statuses;

function FilesToSendModalView(props: Props) {
    const { sendingError, loading, files, addFiles, sendFiles, close } = props;

    const { image, video, document, audio } = files.value;

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const fileLength = image.length + document.length + audio.length + video.length;

    const imgClick = (index: number) => {
        photoAndVideoFromSwiper.set({
            update: true,
            type: 'img',
            startIndex: index,
            items: image.map((i) => ({ id: i.id, name: i.name, url: i.fileUrl })),
        });
    };

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
                {image.length ? (
                    <Image.List
                        imgClick={imgClick}
                        items={image.map((i) => ({
                            remove: (id) => files.deleteById({ type: 'image', id }),
                            id: i.id,
                            url: i.fileUrl,
                            height: image.length === 1 ? '100%' : '120px',
                            width: image.length === 1 ? '100%' : 'auto',
                        }))}
                    />
                ) : null}
                {audio.length
                    ? audio.map((i) => (
                          <Item key={i.id} remove={() => files.deleteById({ type: 'audio', id: i.id })}>
                              <Audio url={i.fileUrl} authorName={i.album?.artist} name={i.name} description={i.album?.title} cover={i.album?.coverUrl} />
                          </Item>
                      ))
                    : null}
                {video.length
                    ? video.map((i) => (
                          <Item key={i.id} remove={() => files.deleteById({ type: 'video', id: i.id })}>
                              <Video.Card previewUrl={i.previewUrl} name={i.name} size={+i.size} />
                          </Item>
                      ))
                    : null}
                {document.length
                    ? document.map((i) => (
                          <Item key={i.id} remove={() => files.deleteById({ type: 'document', id: i.id })}>
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
