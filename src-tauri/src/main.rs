#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
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
