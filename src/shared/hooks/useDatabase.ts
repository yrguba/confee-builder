import { fileConverter } from 'shared/lib';

import useFs from './useFS';

type Entities = 'chats';

function useDatabase() {
    const { saveTextFile, getTextFile } = useFs();
    const save = async (data: any, entity: Entities) => {
        await saveTextFile({ baseDir: 'Document', folderDir: 'database', fileName: entity, json: JSON.stringify(data) });
    };
    const get = async (entity: Entities) => {
        const file: any = await getTextFile({ baseDir: 'Document', folderDir: 'database', fileName: entity });
        if (!file) return null;

        return {};
    };
    return { save, get };
}
export default useDatabase;
