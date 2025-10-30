use emojis::{Emoji, SkinTone};
use rand::prelude::*;

pub fn build_emoji_store() -> Vec<&'static Emoji> {
    let mut store: Vec<&Emoji> = Vec::new();
    for emoji in emojis::iter() {
        if emoji.group() == emojis::Group::Flags {
            continue;
        }
        match emoji.skin_tone() {
            Some(skin_tone) => {
                if skin_tone != SkinTone::Default {
                    continue;
                }
            }
            None => {}
        }
        store.push(emoji);
    }

    return store;
}

pub struct Emojifier {
    pub emoji_store: Vec<&'static Emoji>,
    pub rng: ThreadRng,
}

impl Emojifier {
    pub fn new() -> Self {
        return Self {
            emoji_store: build_emoji_store(),
            rng: rand::rng(),
        };
    }

    pub fn random_emoji(&mut self) -> &'static Emoji {
        self.emoji_store[self.rng.random_range(0..self.emoji_store.len())]
    }

    pub fn emojify(&mut self, text: &String) -> String {
        let mut result: Vec<String> = Vec::new();
        for word in text.trim().split(' ') {
            result.push(word.to_string());

            let mut emoji_count = self.rng.random_range(0..=3);
            let mut emoji_builder = Vec::with_capacity(emoji_count);
            while emoji_count > 0 {
                emoji_builder.push(self.random_emoji().as_str());
                emoji_count -= 1;
            }

            if emoji_builder.len() > 0 {
                result.push(emoji_builder.join(""));
            } else {
                result.push(" ".to_string());
            }
        }

        return result.join("");
    }
}
