import { fileConverter } from 'shared/lib';

import useFs from './useFS';

function useDatabase() {
    const { saveTextFile, getTextFile } = useFs();
    const save = async (data: any, name: string) => {
        await saveTextFile({ baseDir: 'Document', folderDir: 'database', fileName: name, json: JSON.stringify(data) });
    };
    const get = async (name: string) => {
        const file: any = await getTextFile({ baseDir: 'Document', folderDir: 'database', fileName: name });
        if (!file) return null;
        return JSON.parse(file);
    };
    return { save, get };
}
export default useDatabase;
