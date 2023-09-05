import { fileConverter } from 'shared/lib';

import useFs from './useFS';

type Entities = 'chats';

function useDatabase() {
    const { saveFile, getFile } = useFs();
    const save = async (data: any, entity: Entities) => {
        // await saveFile({ baseDir: 'Document', folderDir: 'database', fileName: entity, fileBlob: fileConverter.objectToBlob(data) });
    };
    const get = async (entity: Entities) => {
        const file: any = await getFile({ baseDir: 'Document', folderDir: 'database', fileName: entity });
        if (!file) return null;

        return {};
    };
    return { save, get };
}
export default useDatabase;
