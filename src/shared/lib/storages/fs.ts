import { writeTextFile, BaseDirectory, createDir, exists, readTextFile, removeFile } from '@tauri-apps/api/fs';

import { project, tauri } from 'shared/constanst';
import { StorageObjectsNames } from 'shared/enums';

const dirInDocument = BaseDirectory.Document;
const storageBaseDir = `${project.name}/storage`;

const paths = {
    tokens: `${storageBaseDir}/tokens.txt`,
    config: `${storageBaseDir}/config.txt`,
};

const getPath = (name: string) => {
    if (name.includes('token')) return paths.tokens;
    return paths.config;
};

export const set = async (name: keyof typeof StorageObjectsNames, value: string) => {
    if (!tauri.isRunning) return null;
    const path = getPath(name);
    const obj = { [name]: value };
    const checkPath = await exists(storageBaseDir, { dir: dirInDocument });
    if (!checkPath) await createDir(storageBaseDir, { dir: dirInDocument, recursive: true });
    const checkConfigFile = await exists(path, { dir: dirInDocument });
    let newTokens = null;
    if (checkConfigFile) {
        const oldTokens = await readTextFile(path, { dir: dirInDocument });
        newTokens = { ...JSON.parse(oldTokens), ...obj };
    }
    await writeTextFile({ path, contents: JSON.stringify(newTokens || obj) }, { dir: dirInDocument });
};

export const get = async (name: keyof typeof StorageObjectsNames) => {
    if (!tauri.isRunning) return null;
    const path = getPath(name);
    const checkPath = await exists(path, { dir: dirInDocument });
    if (!checkPath) return null;
    const file = await readTextFile(path, { dir: dirInDocument });
    const value = JSON.parse(file)[name];
    return value || null;
};

export const getAll = async (fileName: keyof typeof paths) => {
    if (!tauri.isRunning) return null;
    const path = getPath(fileName);
    const checkPath = await exists(path, { dir: dirInDocument });
    if (!checkPath) return null;
    const file = await readTextFile(path, { dir: dirInDocument });
    return JSON.parse(file);
};

export const remove = async (name: keyof typeof StorageObjectsNames) => {
    if (!tauri.isRunning) return null;
    const path = getPath(name);
    const checkPath = await exists(path, { dir: dirInDocument });
    if (!checkPath) return null;
    const tokens = await readTextFile(path, { dir: dirInDocument });
    const obj = JSON.parse(tokens);
    delete obj[name];
    await writeTextFile({ path, contents: JSON.stringify(obj) }, { dir: dirInDocument });
};

export const clear = async (fileName: keyof typeof paths) => {
    if (!tauri.isRunning) return null;
    const path = getPath(fileName);
    const checkPath = await exists(path, { dir: dirInDocument });
    if (!checkPath) return null;
    await removeFile(path, { dir: dirInDocument });
};
