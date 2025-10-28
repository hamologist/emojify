use std::io::{self};
use clap::{self, ArgAction};
use emojis::Emoji;

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

fn main() {
    let matches = clap::Command::new("test")
        .about("Adds emojis throughout a provided input")
        .arg(
            clap::Arg::new("hello")
                .short('a')
                .action(ArgAction::SetTrue)
                .help("Outputs HELLO WORLD")
        )
        .get_matches();

    if matches.get_flag("hello") {
        println!("HELLO WORLD!");
    } else {
        println!("...");
    }

    let mut input = Vec::new();
    for line in io::stdin().lines() {
        input.push(line.unwrap());
    }

    println!("{}", input.join("\n"));
}
