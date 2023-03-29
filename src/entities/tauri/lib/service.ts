class TauriService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;
}

export default new TauriService();
