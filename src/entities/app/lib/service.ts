class AppService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;
}

export default new AppService();
