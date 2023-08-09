import { writeTextFile, BaseDirectory, createDir, exists, readTextFile, removeFile } from '@tauri-apps/api/fs';

import { appService } from '../../entities/app';

const baseDir = BaseDirectory.Document;
const cacheDir = `/Confee/cache`;

const { tauriIsRunning } = appService;

export const add = async (name: string, value: string) => {
    if (!tauriIsRunning) return null;

    const obj = { [name]: value };
    const checkPath = await exists(cacheDir, { dir: baseDir });
    console.log(checkPath);
    // if (!checkPath) await createDir(storageBaseDir, { dir: dirInDocument, recursive: true });
    // const checkConfigFile = await exists(path, { dir: dirInDocument });
    // let newTokens = null;
    // if (checkConfigFile) {
    //     const oldTokens = await readTextFile(path, { dir: dirInDocument });
    //     newTokens = { ...JSON.parse(oldTokens), ...obj };
    // }
    // await writeTextFile({ path, contents: JSON.stringify(newTokens || obj) }, { dir: dirInDocument });
};

// export const get = async (name: keyof typeof StorageObjectsNames) => {
//     if (!tauriIsRunning) return null;
//     const path = getPath(name);
//     const checkPath = await exists(path, { dir: dirInDocument });
//     if (!checkPath) return null;
//     const file = await readTextFile(path, { dir: dirInDocument });
//     const value = JSON.parse(file)[name];
//     return value || null;
// };
//
// export const getAll = async (fileName: keyof typeof paths) => {
//     if (!tauriIsRunning) return null;
//     const path = getPath(fileName);
//     const checkPath = await exists(path, { dir: dirInDocument });
//     if (!checkPath) return null;
//     const file = await readTextFile(path, { dir: dirInDocument });
//     return JSON.parse(file);
// };
//
// export const remove = async (name: keyof typeof StorageObjectsNames) => {
//     if (!tauriIsRunning) return null;
//     const path = getPath(name);
//     const checkPath = await exists(path, { dir: dirInDocument });
//     if (!checkPath) return null;
//     const tokens = await readTextFile(path, { dir: dirInDocument });
//     const obj = JSON.parse(tokens);
//     delete obj[name];
//     await writeTextFile({ path, contents: JSON.stringify(obj) }, { dir: dirInDocument });
// };
//
// export const clear = async (fileName: keyof typeof paths) => {
//     if (!tauriIsRunning) return null;
//     const path = getPath(fileName);
//     const checkPath = await exists(path, { dir: dirInDocument });
//     if (!checkPath) return null;
//     await removeFile(path, { dir: dirInDocument });
// };
