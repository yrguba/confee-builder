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
} from '@tauri-apps/api/fs';
import { appDataDir, join, documentDir, downloadDir } from '@tauri-apps/api/path';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import moment from 'moment';
import { metadata, Metadata } from 'tauri-plugin-fs-extra-api';
import { download } from 'tauri-plugin-upload-api';

import { appService } from 'entities/app';
import { tokensService } from 'entities/viewer';
import { debounce } from 'shared/lib';

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
    obj: any;
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
        const cacheMeta = await getMetadata({ baseDir: 'document', folder: 'cache' });
        const cacheSize = cacheMeta?.size;
        if (!cacheSize) return;
        const maxBytes = 0.001 * 1073741824;

        const memoryToClear = Math.ceil(cacheSize - maxBytes) + 20000;
        if (memoryToClear > 0) {
            debounceClear(async () => {
                const currentMemoryToClear = memoryToClear;
                const all: FileEntry[] = [];

                Promise.all(
                    ['img', 'video', 'audio'].map(async (folder) => {
                        const path = await join(await documentDir(), 'Confee', 'cache', folder);
                        if (await exists(path)) {
                            const files = await readDir(path);
                            all.push(...files);
                        }
                    })
                ).then(() => {});

                console.log('fefesf', all);
                all.forEach((i) => {
                    console.log(i);
                });

                //  const clearing = async (remainsToClear: number) => {
                //      if(remainsToClear > 0){
                //
                //      }else{
                //         return
                //      }
                //  };
                // await clearing(currentMemoryToClear)
            });
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
                    size: currentFile.size,
                    fullPath,
                    date: moment().format('DD.MM.YYYY, HH:mm:ss'),
                };
                if (!(await exists(indexingPath))) {
                    await writeTextFile(indexingPath, JSON.stringify([obj]));
                } else {
                    const file = await readTextFile(indexingPath);
                    if (file) {
                        const indexing = JSON.parse(file);
                        indexing.push(obj);
                        await writeTextFile(indexingPath, JSON.stringify(indexing));
                    }
                }
                await checkMemoryCacheAndClear();
            }
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

    const remove = async (props: RemoveProps) => {
        if (disabled) return null;
        const root = await join(await baseDirs[props.baseDir](), 'Confee');
        const path = await join(root, props.folder || '', props.fileType || '', props.fileName || '');
        const checkPath = await exists(path);
        if (!checkPath) return null;
        await removeDir(path, { recursive: true });
        return '';
    };

    return { downLoadAndSave, saveAsJson, getFileUrl, getJson, getMetadata, remove };
};

export default useFS;
