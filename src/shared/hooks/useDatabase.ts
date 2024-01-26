import { exists } from '@tauri-apps/api/fs';
import { documentDir, join } from '@tauri-apps/api/path';

import { fileConverter } from 'shared/lib';

import useFs from './useFS';

function useDatabase() {
    const { saveTextFile, getTextFile } = useFs();
    const save = async (data: any, name: string) => {
        if (data) {
            await saveTextFile({ baseDir: 'Document', folderDir: 'database', fileName: name.split('/').join(''), json: JSON.stringify(data) });
        }
    };

    const check = async (name: string) => {
        const docDir = await documentDir();
        const filePath = await join(docDir, 'Confee', 'database', 'json', name.split('/').join(''));
        return exists(filePath);
    };

    const get = async (name: string) => {
        const file: any = await getTextFile({ baseDir: 'Document', folderDir: 'database', fileName: name.split('/').join('') });
        if (!file) return null;
        return JSON.parse(file);
    };
    return { save, get, check };
}
export default useDatabase;
