import Notification from 'shared/ui/notification';

import useEasyState from './useEasyState';
import { appService } from '../../entities/app';

import { useFs } from './index';

const useSaveMediaContent = () => {
    const isLoading = useEasyState(false);
    const saveInDownload = (url?: string, fileName?: string | undefined) => {
        if (appService.tauriIsRunning && url && fileName) {
            return new Promise((resolve, reject) => {
                const { saveFile } = useFs();
                isLoading.set(true);
                fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        saveFile({ fileName, fileBlob: blob, folderDir: '', baseDir: 'Download' })
                            .then(() => {
                                resolve(null);
                                // notification.success({ title: 'Файл сохранен', system: true });
                            })
                            .finally(() => {
                                setTimeout(() => {
                                    isLoading.set(false);
                                }, 500);
                                reject();
                            });
                    });
            });
        }
    };

    return { saveInDownload, isLoading: isLoading.value };
};

export default useSaveMediaContent;
