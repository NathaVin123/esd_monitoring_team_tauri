// Import Tauri API
import { invoke } from '@tauri-apps/api/tauri';

// Send console log message to Tauri
export function sendConsoleLog(message: string) {
    invoke('send_console_log', {message}).then(() => {});
}

export default sendConsoleLog;
