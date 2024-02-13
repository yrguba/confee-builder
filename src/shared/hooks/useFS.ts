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

type SharedProps = {
    fileName: string;
    fileType?: FileTypes;
    baseDir: keyof typeof baseDirs;
    folder?: 'cache';
};

type DownLoadAndSave = {
    url: string;
    fileType?: FileTypes;
    progressCallback?: (progress: number) => void;
} & SharedProps;

type SaveAsJsonProps = {
    obj: any;
} & SharedProps;

type GetFileUrlProps = {} & SharedProps;
type GetTextFileProps = {} & SharedProps;
type GetMetadataProps = {} & SharedProps;
type DeleteFolderProps = {};

const useFS = () => {
    const disabled = !window.__TAURI__;
    const { backBaseURL } = appService.getUrls();

    const downLoadAndSave = async (props: DownLoadAndSave) => {
        if (disabled || props.url.includes('asset.localhost') || props.url.includes('blob') || !props.fileName) return null;
        const url = `${backBaseURL}${props.url}`;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const getPath = async () => {
            if (props.baseDir === 'download') return root;
            return join(root, `${props.folder ? props.folder : ''}`, `${props.fileType ? props.fileType : ''}`);
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

        const tokens = tokensService.get();
        if (tokens?.access_token) {
            const getProgress = (progress: number, total: number) => {
                if (props?.progressCallback) {
                    props.progressCallback(Math.floor((progress * 100) / total));
                }
            };
            const headers = new Map();
            headers.set('Authorization', `Bearer ${tokens.access_token}`);
            await download(url, fullPath, getProgress, headers).then((r) => {
                if (props?.progressCallback) {
                    props.progressCallback(100);
                }
            });
        }
    };

    const saveAsJson = async (props: SaveAsJsonProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const folderPath = await join(root, props.folder || '', props.fileType || '');
        const checkPath = await exists(folderPath);
        if (!checkPath) await createDir(folderPath, { recursive: true });
        try {
            const filePath = await join(folderPath, props.fileName);
            await writeTextFile(filePath, JSON.stringify(props.obj));
        } catch (e) {
            console.log(e);
        }
        return '';
    };

    const getFileUrl = async (props: GetFileUrlProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const fileName = props.fileName.split('/').join('');
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const filePath = await join(root, props.folder || '', props.fileType || '', fileName);
        const checkPath = await exists(filePath);
        if (!checkPath) return null;
        return convertFileSrc(filePath);
    };

    const getJson = async (props: GetTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const folderPath = await join(root, props.folder || '', props.fileType || '');

        const checkPath = await exists(folderPath);
        if (!checkPath) return null;
        try {
            const filePath = await join(folderPath, props.fileName);
            return await readTextFile(filePath);
        } catch (e) {
            console.log(e);
        }
    };

    const getMetadata = async (props: GetMetadataProps): Promise<Metadata | null> => {
        if (disabled) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const filePath = await join(root, props.folder || '', props.fileType || '', props.fileName || '');
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

    return { downLoadAndSave, saveAsJson, getFileUrl, getJson, getMetadata, deleteFolder };
};

export default useFS;
