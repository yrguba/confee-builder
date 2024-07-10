import { Command, open } from '@tauri-apps/api/shell';

function useShell() {
    const openBrowser = (url: string) => {
        open(url).then();
    };

    return { openBrowser };
}

export default useShell;
