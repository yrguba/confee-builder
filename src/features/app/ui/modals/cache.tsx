import React, { useEffect } from 'react';

import { CacheView } from 'entities/app';
import { Modal, ModalTypes } from 'shared/ui';

import { useArray, useEasyState, useFs } from '../../../../shared/hooks';
import { sizeConverter } from '../../../../shared/lib';

type Categories = 'img' | 'video' | 'audio' | 'system' | 'all';

function CacheModal(modal: ModalTypes.UseReturnedType) {
    const { getMetadata } = useFs();

    const sizes = useEasyState({ img: '', video: '', audio: '', system: '', all: '' });
    const clearing = useArray({});

    useEffect(() => {
        Promise.all(
            ['img', 'video', 'audio', 'json'].map((i) => {
                getMetadata({ baseDir: 'document', folder: 'cache', fileType: i as any }).then((res) => {
                    res?.size && sizes.set((prev) => ({ ...prev, [i]: sizeConverter(res.size) }));
                });
            })
        ).then();
        getMetadata({ baseDir: 'document', folder: 'cache' }).then((res) => {
            res?.size && sizes.set((prev) => ({ ...prev, all: sizeConverter(res.size) }));
        });
    }, []);

    const clear = (category: Categories) => {
        clearing.push({ id: category });
    };

    return <CacheView sizes={sizes.value} clear={clear} clearing={clearing.array as any} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <CacheModal {...modal} />
        </Modal>
    );
}
