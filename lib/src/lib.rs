use emojis::Emoji;
use rand::prelude::*;

pub fn build_emoji_store() -> Vec<&'static Emoji> {
    return emojis::iter()
        .filter(|emoji| -> bool {
            return emoji.group() != emojis::Group::Flags;
        })
        .collect::<Vec<&Emoji>>();
}

pub struct Emojifier {
    pub emoji_store: Vec<&'static Emoji>,
}

impl Emojifier {
    pub fn new() -> Self {
        return Self {
            emoji_store: build_emoji_store(),
        };
    }

    pub fn emojify(&self, text: &String) -> String {
        let mut result: Vec<String> = Vec::new();
        let mut rng = rand::rng();
        for word in text.trim().split(' ') {
            result.push(word.to_string());

            let mut emoji_count = rng.random_range(0..=3);
            let mut emoji_builder = Vec::with_capacity(emoji_count);
            while emoji_count > 0 {
                emoji_builder
                    .push(self.emoji_store[rng.random_range(0..self.emoji_store.len())].as_str());
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
