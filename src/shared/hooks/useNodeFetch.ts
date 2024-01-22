import { getClient, ResponseType } from '@tauri-apps/api/http';

import { fileConverter } from '../lib';

import { useEasyState } from './index';

function useNodeFetch() {
    const content = useEasyState<string>('');

    const fetchContent = async (url: string) => {
        if (url) {
            const client = await getClient();
            const response = await client.get(url, { responseType: ResponseType.Binary });
            const u8a = new Uint8Array(response.data as any);
            const localUrl = await fileConverter.arrayBufferToBlobLocalPath(u8a);
            content.set(localUrl);
        }
    };

    return { fetchContent, content: content.value };
}
export default useNodeFetch;
