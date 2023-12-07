import Notification from 'shared/ui/notification';

import useEasyState from './useEasyState';
import { appService } from '../../entities/app';

import { useFs } from './index';

const useSaveMediaContent = () => {
    const isLoading = useEasyState(false);
    const saveInDownload = (fileBlob: Blob | null | undefined, fileName: string | undefined) => {
        if (appService.tauriIsRunning && fileBlob && fileName) {
            return new Promise((resolve, reject) => {
                const { saveFile } = useFs();
                isLoading.set(true);
                saveFile({ fileName, fileBlob, folderDir: '', baseDir: 'Download' })
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
        }
    };

    return { saveInDownload, isLoading: isLoading.value };
};

export default useSaveMediaContent;
