import { Emoji, EmojiStyle } from 'emoji-picker-react';
import React from 'react';

function replaceEmojis(text: string) {
    let updText = text;
    const emojis = text.match(/[\p{Emoji}\u200d]+/gu);

    emojis?.forEach((emoji) => {
        // get the unicodes of the emoji
        let unicode = '';

        function getNextChar(pointer: any) {
            const subUnicode = emoji.codePointAt(pointer);
            if (!subUnicode) return;
            unicode += `-${subUnicode.toString(16)}`;
            getNextChar(++pointer);
        }

        getNextChar(0);

        unicode = unicode.substr(1); // remove the beginning dash '-'
        console.log(unicode.toUpperCase());

        // replace emoji here
        updText = text.replace(emoji, unicode.toUpperCase());
    });

    return updText;
}
export default replaceEmojis;
