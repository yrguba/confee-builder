import { writeBinaryFile, BaseDirectory, readDir, createDir, exists, readBinaryFile, removeDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { appDataDir, join, documentDir, downloadDir } from '@tauri-apps/api/path';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { metadata, Metadata } from 'tauri-plugin-fs-extra-api';
import { download } from 'tauri-plugin-upload-api';

import useThrottle from './useThrottle';
import { appService } from '../../entities/app';
import { tokensService } from '../../entities/viewer';

export type FileTypes = 'img' | 'video' | 'document' | 'audio' | 'json';

const baseDirs = {
    download: downloadDir,
    document: documentDir,
};

type SaveFromBackProps = {
    url: string;
    fileName: string;
    baseDir: keyof typeof baseDirs;
    folderDir?: 'cache';
    fileType?: FileTypes;
    progressCallback?: (progress: number) => void;
};

type SaveFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    fileBlob: Blob;
    fileType?: FileTypes;
};

type SaveTextFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    json: string;
};

type GetFileProps = {} & Omit<SaveFileProps, 'fileBlob'>;
type GetTextFileProps = {} & Omit<SaveTextFileProps, 'json'>;
type GetFolderSizeProps = {
    folderInDock: 'cache' | 'database';
    folderInCache?: 'audio' | 'img' | 'video';
    fileName?: string;
};
type DeleteFolderProps = {} & GetFolderSizeProps;

const useFS = () => {
    const disabled = !window.__TAURI__;
    const { backBaseURL } = appService.getUrls();

    const saveFromBack = async (props: SaveFromBackProps) => {
        if (disabled) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const getPath = async () => {
            if (props.baseDir === 'download') return root;
            return join(root, `${props.folderDir ? props.folderDir : ''}`, `${props.fileType ? props.fileType : ''}`);
        };
        const path = await getPath();
        const fullPath = await join(path, props.fileName.split('/').join(''));
        const checkPath = await exists(path);
        if (!checkPath) {
            await createDir(path, { recursive: true });
        }
        if (await exists(fullPath)) {
            props.progressCallback && props.progressCallback(100);
            return;
        }
        const serverPath = `${backBaseURL}${props.url}`;
        const tokens = tokensService.get();
        if (tokens?.access_token) {
            const headers = new Map();
            headers.set('Authorization', `Bearer ${tokens.access_token}`);
            await download(serverPath, fullPath, (progress, total) => props.progressCallback && props.progressCallback(100), headers);
        }
    };

    const saveFile = async (props: SaveFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}${props.fileType ? `/${props.fileType}` : ''}`;

        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) await createDir(folderDir, { dir: baseDir, recursive: true });
        const arrayBuffer = await props.fileBlob.arrayBuffer();
        try {
            await writeBinaryFile(`${folderDir}/${props.fileName.split('/').join('')}`, arrayBuffer, {
                dir: baseDir,
            });
        } catch (e) {
            console.log(e);
        }
        return '';
    };

    const saveTextFile = async (props: SaveTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}/json`;

        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) await createDir(folderDir, { dir: baseDir, recursive: true });
        try {
            await writeTextFile(`${folderDir}/${props.fileName.split('/').join('')}`, props.json, {
                dir: baseDir,
            });
        } catch (e) {
            console.log(e);
        }
        return '';
    };

    const getFileUrl = async (props: GetFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const fileName = props.fileName.split('/').join('');
        const docDir = await documentDir();
        const filePath = await join(docDir, 'Confee', props.folderDir, props.fileType ? props.fileType : '', fileName);
        const checkPath = await exists(filePath);
        if (!checkPath) return null;
        return convertFileSrc(filePath);
    };

    const getTextFile = async (props: GetTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}/json`;

        const checkPath = await exists(`${folderDir}/${props.fileName}`, { dir: baseDir });
        if (!checkPath) return null;
        return readTextFile(`${folderDir}/${props.fileName}`, { dir: baseDir });
    };

    const getMetadata = async (props: GetFolderSizeProps): Promise<Metadata | null> => {
        if (disabled) return null;
        const docDir = await documentDir();
        const filePath = await join(
            docDir,
            'Confee',
            props.folderInDock,
            `${props.folderInCache ? props.folderInCache : ''}`,
            `${props.fileName ? props.fileName : ''}`
        );
        const checkPath = await exists(filePath);
        if (!checkPath) return null;
        return metadata(filePath);
    };

    const deleteFolder = async (props: DeleteFolderProps) => {
        if (disabled) return null;
        // const baseDir: any = BaseDirectory[props.baseDir];
        // const folderDir: any = `Confee/${props.folderDir}`;
        // const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        // if (!checkPath) return null;
        // await removeDir(folderDir, { dir: baseDir, recursive: true });
    };

    return { saveFromBack, saveFile, saveTextFile, getFileUrl, getTextFile, getMetadata, deleteFolder };
};

export default useFS;
