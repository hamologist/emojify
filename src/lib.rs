use emojis::Emoji;
use rand::prelude::*;

fn build_emoji_store() -> Vec<&'static Emoji> {
    let mut store: Vec<&Emoji> = Vec::new();
    for emoji in emojis::iter() {
        if emoji.group() == emojis::Group::Flags {
            continue;
        }
        store.push(emoji);
    }

    return store;
}

pub struct Emojifier {
    emoji_store: Vec<&'static Emoji>,
    rng: ThreadRng,
}

impl Emojifier {
    pub fn new() -> Self {
        return Self {
            emoji_store: build_emoji_store(),
            rng: rand::rng(),
        }
    }

    pub fn random_emoji(mut self) -> &'static Emoji {
        self.emoji_store[self.rng.random_range(0..self.emoji_store.len())]
    }

    pub fn emojify(mut self, text: String) -> String {
        let result: Vec<String> = Vec::new();
        for word in text.split(' ') {
            self.rng.random_range(0..)
        }

        return result.join(" ");
    }
}
