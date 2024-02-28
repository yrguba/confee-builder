import {
    writeBinaryFile,
    BaseDirectory,
    readDir,
    createDir,
    exists,
    readBinaryFile,
    removeDir,
    readTextFile,
    writeTextFile,
    FileEntry,
    removeFile,
} from '@tauri-apps/api/fs';
import { appDataDir, join, documentDir, downloadDir } from '@tauri-apps/api/path';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import moment from 'moment';
import { metadata, Metadata } from 'tauri-plugin-fs-extra-api';
import { download } from 'tauri-plugin-upload-api';

import { appService } from 'entities/app';
import { tokensService } from 'entities/viewer';
import { debounce } from 'shared/lib';

import useRustServer from './useRustServer';

import { useStorage } from '.';

export type FileTypes = 'img' | 'video' | 'document' | 'audio' | 'json';

const baseDirs = {
    download: downloadDir,
    document: documentDir,
};

type SharedProps = {
    fileName?: string;
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
    data: any;
} & SharedProps;

type GetFileUrlProps = {} & SharedProps;
type GetTextFileProps = {} & SharedProps;
type GetMetadataProps = {} & SharedProps;
type RemoveProps = {} & SharedProps;

const debounceClear = debounce((callback: () => void) => callback(), 2000);

const useFS = () => {
    const disabled = !window.__TAURI__;
    const { backBaseURL } = appService.getUrls();

    const getMetadata = async (props: GetMetadataProps): Promise<Metadata | null | undefined> => {
        if (disabled) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const path = await join(root, props.folder || '', props.fileType || '', props.fileName || '');
        const checkPath = await exists(path);
        if (!checkPath) return null;
        const folderSize = await invoke('get_folder_size', { path });
        return { ...metadata(path), size: folderSize };
    };

    const checkMemoryCacheAndClear = async () => {
        const storage = useStorage();
        const maxSize = Number(storage.get('max_cache_size'));
        if (!maxSize) return;
        const cachePath = await join(await documentDir(), 'Confee', 'cache');
        const cacheSize = Number(await invoke('get_folder_size', { path: cachePath }));

        if (!cacheSize) return;
        const maxMB = maxSize * 1000;
        const currentMB = Math.round(cacheSize / 1024 / 1024);
        const memoryToClear = Math.round(currentMB - maxMB);

        if (memoryToClear > 0) {
            console.log('clearing old cache');
            const indexingPath = await join(cachePath, 'indexing');
            if (await exists(indexingPath)) {
                const file = await readTextFile(indexingPath);
                // if (file) {
                //     const files = JSON.parse(file) as { size: number; fullPath: string }[];
                //     const sortFiles = files.sort((a: any, b: any) => a.date - b.date);
                //
                // }

                const cleaning = async (remainsToCleaned: number, files: { size: number; fullPath: string }[]) => {
                    if (files.length) {
                        if (await exists(files[0].fullPath)) {
                            await removeFile(files[0].fullPath);
                            const size = files[0]?.size;
                            files.splice(0, 1);
                            if (remainsToCleaned - size > 0) {
                                await cleaning(remainsToCleaned - size, files);
                            }
                        } else {
                            files.splice(0, 1);
                            await cleaning(remainsToCleaned, files);
                        }
                        await writeTextFile(indexingPath, JSON.stringify(files));
                    }
                };
                const files = JSON.parse(file);
                return cleaning(
                    memoryToClear,
                    files.sort((a: any, b: any) => a.date - b.date)
                );
            }
        }
    };

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
            if (props.folder === 'cache') {
                const currentFile = await metadata(fullPath);
                const indexingPath = await join(root, 'cache', 'indexing');
                const obj = {
                    size: Math.ceil(currentFile.size / 1024 / 1024),
                    fullPath,
                    date: moment().unix(),
                };
                if (!(await exists(indexingPath))) {
                    await writeTextFile(indexingPath, JSON.stringify([obj]));
                } else {
                    const file = await readTextFile(indexingPath);
                    if (file) {
                        try {
                            const indexing = JSON.parse(file);

                            if (Array.isArray(indexing)) {
                                indexing.push(obj);
                                await writeTextFile(indexingPath, JSON.stringify(indexing));
                            }
                        } catch (err) {}
                    }
                }
                debounceClear(async () => {
                    await checkMemoryCacheAndClear();
                });
            }
        }
    };

    const saveAsJson = async (props: SaveAsJsonProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const folderPath = await join(root, props.folder || '', 'json');
        const checkPath = await exists(folderPath);
        if (!checkPath) await createDir(folderPath, { recursive: true });
        try {
            const { invoker } = useRustServer();
            const filePath = await join(folderPath, props.fileName);
            await invoker().saveStringFile(filePath, JSON.stringify(props.data));
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

    const checkPath = async (props: SharedProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const fileName = props.fileName.split('/').join('');
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const path = await join(root, props.folder || '', props.fileType || '', fileName || '');
        return exists(path);
    };

    const getJson = async (props: GetTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const folderPath = await join(root, props.folder || '', 'json');

        const checkPath = await exists(folderPath);
        if (!checkPath) return null;
        try {
            const filePath = await join(folderPath, props.fileName);
            const file = await readTextFile(filePath);
            return JSON.parse(file);
        } catch (e) {
            console.log(e);
        }
    };

    const remove = async (props: RemoveProps) => {
        if (disabled) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const path = await join(root, props.folder || '', props.fileType || '', props.fileName || '');
        const checkPath = await exists(path);
        if (!checkPath) return null;
        await removeDir(path, { recursive: true });
        return '';
    };

    return { downLoadAndSave, saveAsJson, getFileUrl, getJson, getMetadata, checkPath, remove };
};

export default useFS;
