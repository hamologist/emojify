# Emojify
**Emojfiy** is a Rust project for spicing up a blob of text with a random assortment of emojis.
The project includes both a Server and CLI frontend for running the emojification logic.
The project also provides a library for interfacing the project with other Rust projects.
Lastly, wasm support is included so the emojification logic can be run on browser.

## Demo
For those wanting to get a quick showcase of the project, a demo using the project wasm target can be found [here](https://www.hamologist.com/demos/emojify/).

## Installation

### Local Installation
You can install tools from the project directly to your machine using cargo.

CLI:
```bash
$ cargo install --git https://github.com/hamologist/emojify.git --branch main emojify-cli
```

Server:
```bash
$ cargo install --git https://github.com/hamologist/emojify.git --branch main emojify-server
```

You can uninstall either of the above tools using:

CLI:
```bash
$ cargo uninstall emojify-cli
```

Server:
```bash
$ cargo uninstall emojify-server
```

### Docker
You can also install and run the package using Docker like so:

First, build the image for the package:
```bash
$ docker build -t emojify https://github.com/hamologist/emojify.git#main
```

Next, run a container using the image you built:
```bash
$ docker run -p 3000:3000 --rm emojify
```
This will run the `emojify-server` command (further detailed below) on host 0.0.0.0 and port 3000.

If you'd rather run `emojify` via the CLI, you can do so using:
```bash
$ docker run --rm -it emojify /bin/sh
```
This will connect you to an interactive shell on the `emojify` container.
You can then run `emojify` using the following:
```bash
$ echo 'Emojify my message with a bunch of emojis please!!!' | emojify
```

## Usage
Once the emojify frontends have been installed, you can start interfacing with both.
### CLI
A `emojify` command will be intalled on your system.
Help can be pulled up using the help flag:
```bash
$ emojify --help
```

The command takes a message sent via STDIN or using a file on your local machine.
Here is an example of what using the tool looks like:
```bash
$ echo 'Emojify my message with a bunch of emojis please!!!' | emojify
```
The above will return an emojified version of your message.

### Server
An `emojify-server` command will be installed on your system.
If executed, the server will start running on host 0.0.0.0 and port 3000 by default.
These values can be changed using the `--host` and `--port` command line arguments.
The server takes requests on its "/" endpoint. Requests must be a POST.

The endpoint's accepted payload uses the following structure:
```json
{
    "input": "{YOUR_MESSAGE_TO_EMOJIFY}"
}
```

You can hit the server using curl like this:
```bash
curl --location --request POST 'localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": "Emojify my message with a bunch of emojis please!!!"
}'
```

## Building the project for wasm
For those interested in generating the project's wasm a `Makefile` is provided.
Assuming you've already installed `wasm-bindgen` and `wasm-opt` you can generate a wasm `pkg` directory using:
```bash
make wasm
```

