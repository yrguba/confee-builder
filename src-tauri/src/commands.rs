use fs_extra::dir::get_size;
use std::{fs};

#[path = "set_notification_icon.rs"]
mod set_notification_icon;

#[tauri::command]
pub async fn open_meet(handle: tauri::AppHandle, url: String, label: String) {
    tauri::WindowBuilder::new(
        &handle,
        label,
        tauri::WindowUrl::External(url.parse().unwrap()),
    ).build().unwrap();
}

#[tauri::command]
pub async fn get_folder_size(path: String) -> i32 {
    let folder_size = get_size(path).unwrap();
    return folder_size.try_into().unwrap();
}

#[tauri::command]
pub fn write_data_to_file(path: &str, data: &[u8]) {
    fs::write(path, data).unwrap();
}



#[tauri::command]
pub fn notif_count(window: tauri::Window, amount: u16) {

    // #[cfg(not(target_os = "linux"))]
    // set_notification_icon::mac(&window, amount);

}