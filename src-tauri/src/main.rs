#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]
extern crate fs_extra;
use std::{fs, io, path::PathBuf};
use fs_extra::dir::get_size;
use tauri::{plugin::TauriPlugin, AppHandle, Manager, Runtime};
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};
use std::fs::OpenOptions;
use std::io::prelude::*;


#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}


#[tauri::command]
async fn open_meet(handle: tauri::AppHandle, url: String, id: String) {
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        id,
        tauri::WindowUrl::External(url.parse().unwrap()),
    ).build().unwrap();
}

#[tauri::command]
async fn get_folder_size(path: String) -> i32 {
    let folder_size = get_size(path).unwrap();
    return folder_size.try_into().unwrap();
}


fn main() {
    let open = CustomMenuItem::new("open".to_string(), "Открыть");
    let quit = CustomMenuItem::new("quit".to_string(), "Закрыть");
    let hide = CustomMenuItem::new("hide".to_string(), "Свернуть");
    let tray_menu = SystemTrayMenu::new()
        .add_item(open)
        .add_item(quit)
        .add_item(hide);

    let system_tray = SystemTray::new()
        .with_menu(tray_menu);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_meet,get_folder_size])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a left click");
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "open" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                    }
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.minimize().unwrap();
                    }
                    _ => {}
                }
            }
            _ => {}
        })
//--------------------------------------------------------------------
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                let label = event.window().label();
                if label == "main" {
                    #[cfg(not(target_os = "macos"))] {
                        event.window().hide().unwrap();
                    }

                    #[cfg(target_os = "macos")] {
                        tauri::AppHandle::hide(&event.window().app_handle()).unwrap();
                    }

                    api.prevent_close();
                }
            }
            _ => {}
        })
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_fs_extra::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
