use std::io::{self, Read};
use std::fs;
use clap::{self, ArgAction};
use emojify::Emojifier;

fn main() {
    let matches = clap::Command::new("test")
        .about("Adds emojis throughout a provided input")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .action(ArgAction::Set)
                .help("Reads input from the provided file instead.")
        )
        .get_matches();

    let filename: Option<&String> = matches.get_one("file");
    let input: String = match filename {
        Some(filename) => {
            match fs::read_to_string(filename) {
                Ok(input) => input,
                Err(_) => {
                    println!("Failed to read input from file.");
                    return;
                }
            }
        }
        None => {
            let mut input: String = String::new();
            match io::stdin().read_to_string(&mut input) {
                Ok(_) => input,
                Err(_) => {
                    println!("Failed to read input from stdin.");
                    return;
                }
            }
        }
    };

    let mut emojifier = Emojifier::new();
    println!("{}", emojifier.emojify(input));
}
