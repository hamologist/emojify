use axum::{
    Router, extract::Json, extract::rejection::JsonRejection, http::StatusCode, routing::post,
};
use clap::{self, ArgAction};
use emojify::Emojifier;
use serde::Deserialize;
use serde_json::{Value, json};

#[derive(Deserialize, Debug)]
struct EmojifyRequest {
    input: String,
}

#[tokio::main]
async fn main() {
    let matches = clap::Command::new("emojify-api")
        .about("Emojification as a service")
        .arg(
            clap::Arg::new("host")
                .long("host")
                .default_value("0.0.0.0")
                .action(ArgAction::Set)
                .help("Host to run the webserver on."),
        )
        .arg(
            clap::Arg::new("port")
                .long("port")
                .default_value("3000")
                .action(ArgAction::Set)
                .help("Port to run the webserver on."),
        )
        .get_matches();

    let host = matches.get_one::<String>("host").unwrap();
    let port = matches.get_one::<String>("port").unwrap();

    let app = Router::new().route("/", post(emojify));

    let listener = tokio::net::TcpListener::bind(format!("{}:{}", host, port))
        .await
        .unwrap();
    let local_addr = match listener.local_addr() {
        Ok(val) => val,
        Err(_) => {
            println!("Failed find local address server is running on.");
            return;
        }
    };
    println!(
        "Server running on {}:{}",
        local_addr.ip(),
        local_addr.port()
    );
    axum::serve(listener, app).await.unwrap();
}

async fn emojify(
    payload: Result<Json<EmojifyRequest>, JsonRejection>,
) -> (StatusCode, Json<Value>) {
    let emojify_request = match payload {
        Ok(emojify_request) => emojify_request,
        Err(e) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({
                    "code": "INVALID_JSON",
                    "message": e.to_string()
                })),
            );
        }
    };
    let payload = Emojifier::new().emojify(&emojify_request.input);

    return (
        StatusCode::OK,
        Json(json!({
            "payload": payload,
        })),
    );
}
