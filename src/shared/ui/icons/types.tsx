export type BaseIconsVariants =
    | 'arrow-drop-down'
    | 'arrow-drop-up'
    | 'arrow-drop-right'
    | 'arrow-left'
    | 'search'
    | 'add-contact'
    | 'close'
    | 'check'
    | 'double-check'
    | 'add'
    | 'notifications'
    | 'notifications-off'
    | 'more'
    | 'new-message'
    | 'logout'
    | 'delete'
    | 'settings'
    | 'swap'
    | 'personal-acc'
    | 'work-acc'
    | 'chat'
    | 'phone'
    | 'videocam'
    | 'videocam-outlined'
    | 'videocam-pulse'
    | 'block'
    | 'volume-off'
    | 'add-photo'
    | 'add-image'
    | 'gallery'
    | 'camera'
    | 'email'
    | 'contacts'
    | 'messages'
    | 'tasks'
    | 'profile'
    | 'microphone'
    | 'microphone-off'
    | 'call-end'
    | 'attach-file'
    | 'emoji'
    | 'send'
    | 'reply'
    | 'edit'
    | 'pin'
    | 'copy'
    | 'redirect'
    | 'check-circle'
    | 'clock'
    | 'reply-black'
    | 'lock'
    | 'forward-black'
    | 'group'
    | 'portfolio'
    | 'melody'
    | 'keyboard'
    | 'group-chat'
    | 'not-authorized'
    | 'privacy-policy'
    | 'support'
    | 'save'
    | 'error'
    | 'mute'
    | 'unmute'
    | 'reload';

export type BaseIconsProps = {
    variant: BaseIconsVariants | undefined;
    size?: 24 | 48 | number;
};

export type PlayerIconsVariants = 'stop' | 'pause' | 'play-outline' | 'pause-outline' | 'play' | 'mute' | 'unmute' | 'full' | 'repeat';

export type PlayerIconsProps = {
    variant: PlayerIconsVariants;
    size?: number;
    active?: boolean;
};

export type NetworkIndicatorProps = {
    speed: number;
    size: number;
    online: boolean;
};

export type DocumentIconsProps = {
    variant: 'pptx' | 'doc' | 'xls';
};

export type DevicesIconsProps = {
    variant: 'phone' | 'desktop' | 'unknown';
};

export type LogoIconsProps = {
    variant: 'confee' | 'confee-white' | 'softworks' | 'tfn' | 'premium';
};
export type PictureIconsProps = {
    variant: 'auth-ad' | 'no-found';
};

export type CountriesIconsProps = {
    variant: 'armenia' | 'belarus' | 'kazakhstan' | 'kyrgyzstan' | 'russia' | 'uzbekistan';
};

export type ArrowAnimatedProps = {
    variant: 'rotate' | 'visible';
    initialDeg?: number;
    animateDeg?: number;
    activeAnimate?: boolean;
};
