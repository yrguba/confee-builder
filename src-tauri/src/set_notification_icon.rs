#[cfg(target_os = "macos")]
pub fn mac(_window: &tauri::Window, amount: u16) {
    use cocoa::{appkit::NSApp, base::nil, foundation::NSString};
    use objc::{msg_send, sel, sel_impl};

    let label = if amount == 0 {
        nil
    } else {
        NSString::alloc(nil).init_str(&format!("{}", amount))
    };
    let dock_tile: cocoa::base::id = msg_send![NSApp(), dockTile];
    let _: cocoa::base::id = msg_send![dock_tile, setBadgeLabel: label];
}