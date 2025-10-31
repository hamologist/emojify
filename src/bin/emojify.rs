use clap::{self, ArgAction};
use emojify::Emojifier;
use std::fs;
use std::io::{self, Read};

fn main() {
    let matches = clap::Command::new("emojify")
        .about("Adds emojis throughout a provided input")
        .arg(
            clap::Arg::new("file")
                .default_value("-")
                .action(ArgAction::Set)
                .help("Reads input from the provided file or STDIN if no value is provided"),
        )
        .get_matches();

    let filename = matches.get_one::<String>("file").unwrap();
    let mut input_reader: Box<dyn Read> = match filename {
        _ if filename == "-" => Box::new(io::stdin()),
        _ => match fs::File::open(filename) {
            Ok(file) => Box::new(file),
            Err(_) => {
                println!("Failed to open provided file.");
                return;
            }
        },
    };

    let mut input: String = String::new();
    match input_reader.read_to_string(&mut input) {
        Ok(_) => {}
        Err(_) => {
            if filename == "-" {
                println!("Failed to read input from STDIN.");
            } else {
                println!("Failed to read input from file.");
            }
            return;
        }
    };

    let emojifier = Emojifier::new();
    println!("{}", emojifier.emojify(&input));
}
