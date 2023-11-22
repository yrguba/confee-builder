import Notification from 'shared/ui/notification';

import { appService } from '../../entities/app';

import { useFs } from './index';

const useSaveMediaContent = () => {
    const saveInDownload = (fileBlob: Blob | null | undefined, fileName: string | undefined) => {
        if (appService.tauriIsRunning && fileBlob && fileName) {
            const { saveFile } = useFs();

            saveFile({ fileName, fileBlob, folderDir: '', baseDir: 'Download' }).then(() => {
                // notification.success({ title: 'Файл сохранен', system: true });
            });
        }
    };

    return { saveInDownload };
};

export default useSaveMediaContent;
