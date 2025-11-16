use wasm_bindgen::prelude::*;
use emojify::Emojifier;

thread_local! {
    static EMOJIFIER: Emojifier = Emojifier::new();
}

#[wasm_bindgen]
pub fn emojify(input: &str) -> String {
    return EMOJIFIER.with(|e| e.emojify(&String::from(input)));
}
