#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};
use tauri::Manager;

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

  tauri::Builder::default().system_tray(system_tray)

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
             window.hide().unwrap();
           }
           _ => {}
         }
       }
       _ => {}
     })
//--------------------------------------------------------------------
  .on_window_event(|event| match event.event() {
   tauri::WindowEvent::CloseRequested { api, .. } => {
     event.window().hide().unwrap();
     api.prevent_close();
   }
   _ => {}
 })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
