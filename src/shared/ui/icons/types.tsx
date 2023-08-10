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
    | 'check-circle';

export type BaseIconsProps = {
    variant: BaseIconsVariants | undefined;
    size?: 24 | 48 | number;
};

export type LogoIconsProps = {
    variant: 'confee' | 'softworks' | 'tfn' | 'premium';
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
