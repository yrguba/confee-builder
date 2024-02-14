import React, { useEffect } from 'react';

import { CacheView } from 'entities/app';
import { Modal, ModalTypes } from 'shared/ui';

import { useArray, useEasyState, useFs, UseFsTypes } from '../../../../shared/hooks';
import { sizeConverter } from '../../../../shared/lib';

type Categories = UseFsTypes.FileTypes | 'all';

function CacheModal(modal: ModalTypes.UseReturnedType) {
    const { getMetadata, remove } = useFs();

    const sizes = useEasyState({ img: '', video: '', audio: '', document: '', system: '', all: '' });
    const clearing = useArray({});

    const confirmClearing = Modal.useConfirm<Categories>((value, category) => {
        if (value && category) {
            clearing.push({ id: category });
            if (category === 'all') {
                remove({ baseDir: 'document', folder: 'cache' }).then(() => {
                    clearing.deleteById('all');
                    sizes.set((prev) => ({ ...prev, all: '' }));
                });
            } else {
                remove({ baseDir: 'document', folder: 'cache', fileType: category }).then(() => {
                    clearing.deleteById(category);
                    sizes.set((prev) => ({ ...prev, [category]: '' }));
                });
            }
        }
    });

    const clear = (category: Categories) => {
        const dictionary = {
            img: 'все фото из кэша',
            video: 'все видео из кэша',
            document: 'все аудио из кэша',
            audio: 'все аудио из кэша',
            json: 'все системные файлы из кэша',
            all: 'весь кэш',
        };
        confirmClearing.open(category, {
            title: 'Очистить кэш',
            subtitle: `Вы действительно хотите очистить ${dictionary[category]}?`,
        });
    };

    useEffect(() => {
        const arr: UseFsTypes.FileTypes[] = ['img', 'video', 'document', 'audio', 'json'];
        Promise.all(
            arr.map((i) => {
                getMetadata({ baseDir: 'document', folder: 'cache', fileType: i }).then((res) => {
                    res?.size && sizes.set((prev) => ({ ...prev, [i]: sizeConverter(res.size) }));
                });
            })
        ).then();
        getMetadata({ baseDir: 'document', folder: 'cache' }).then((res) => {
            res?.size && sizes.set((prev) => ({ ...prev, all: sizeConverter(res.size) }));
        });
    }, []);

    return (
        <>
            <Modal.Confirm {...confirmClearing} okText="Да, очистить" />
            <CacheView sizes={sizes.value} clear={clear} clearing={clearing.array as any} />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <CacheModal {...modal} />
        </Modal>
    );
}
