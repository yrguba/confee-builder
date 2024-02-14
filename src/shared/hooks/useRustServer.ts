function useRustServer() {
    console.log('d');

    return { isRunning: !!window.__TAURI__ };
}

export default useRustServer;
