import * as buffer from 'buffer';

import { writeBinaryFile, BaseDirectory, createDir, exists, readTextFile, removeFile } from '@tauri-apps/api/fs';

type SavaProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'downloads';
    fileName: string | undefined;
    fileBlob: Blob;
};

const useFileDownloads = () => {
    const save = async (props: SavaProps) => {
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) await createDir(folderDir, { dir: baseDir, recursive: true });
        const arrayBuffer = await props.fileBlob.arrayBuffer();
        try {
            await writeBinaryFile(
                { path: `${folderDir}/${props.fileName}`, contents: arrayBuffer },
                {
                    dir: baseDir,
                }
            );
        } catch (e) {
            console.log(e);
        }
        return '';
    };
    return { save };
};

export default useFileDownloads;
