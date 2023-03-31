class ApplicationService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;
}

export default new ApplicationService();
