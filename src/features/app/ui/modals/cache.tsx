import React, { useEffect } from 'react';

import { CacheView } from 'entities/app';
import { Modal, ModalTypes } from 'shared/ui';

import { useArray, useEasyState, useFs, UseFsTypes } from '../../../../shared/hooks';
import { sizeConverter } from '../../../../shared/lib';

type Categories = UseFsTypes.FileTypes | 'all';

const defaultSizes = { img: 0, video: 0, audio: 0, document: 0, system: 0, all: 0 };

function CacheModal(modal: ModalTypes.UseReturnedType) {
    const { getMetadata, remove } = useFs();

    const sizes = useEasyState(defaultSizes);
    const maxSize = useEasyState(1);
    const clearing = useArray({});

    const confirmClearing = Modal.useConfirm<Categories>((value, category) => {
        if (value && category) {
            clearing.push({ id: category });
            if (category === 'all') {
                remove({ baseDir: 'document', folder: 'cache' }).then(() => {
                    clearing.deleteById('all');
                    sizes.set(defaultSizes);
                });
            } else {
                remove({ baseDir: 'document', folder: 'cache', fileType: category }).then(() => {
                    clearing.deleteById(category);
                    const allSize = Object.entries(sizes.value).reduce((acc: number, [key, value]) => {
                        if (key !== 'all' && key !== category) {
                            return acc + value;
                        }
                        return acc;
                    }, 0);
                    sizes.set((prev) => ({ ...prev, [category]: 0, all: allSize }));
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
                    res?.size && sizes.set((prev) => ({ ...prev, [i]: res.size }));
                });
            })
        ).then();
        getMetadata({ baseDir: 'document', folder: 'cache' }).then((res) => {
            res?.size && sizes.set((prev) => ({ ...prev, all: res.size }));
        });
    }, []);

    return (
        <>
            <Modal.Confirm {...confirmClearing} okText="Да, очистить" />
            <CacheView sizes={sizes.value} clear={clear} clearing={clearing.array as any} maxSize={maxSize} />
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
