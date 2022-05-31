import emojis from './emojis';

export const emojifier = (message: string): string => {
    const seperated = message.split(' ');
    for (let i = 0; i < seperated.length; i ++) {
        const checkOne = Math.floor(Math.random() * 2);
        const checkTwo = Math.floor(Math.random() * 3);

        if (checkOne === 1) {
            for (let emojiCount = Math.floor(Math.random() * 4); emojiCount > 0; emojiCount--) {
                seperated[i] += emojis[Math.floor(Math.random() * emojis.length)];
            }
        } else if (checkTwo === 1) {
            seperated[i] += emojis[Math.floor(Math.random() * emojis.length)];
        }
    }

    return seperated.join(' ');
}
