use fs_extra::dir::get_size;
use std::{fs};
use tauri;

#[path = "set_notification_icon.rs"]
mod set_notification_icon;

#[tauri::command]
pub async fn open_meet(handle: tauri::AppHandle, url: String, label: String) {
    print!("count");
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
pub fn set_icon_counter(count: String) {
    if cfg!(target_os = "windows") {
        // tauri::AppHandle::tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/share_ico_socialnetwork_16174.png").to_vec())).unwrap();
        // tauri::AppHandle::tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/share_ico_socialnetwork_16174.png").to_vec()));

        // let mut res = winres::WindowsResource::new();
        // res.set_icon("test.ico");
        // res.compile().unwrap();
    }
}