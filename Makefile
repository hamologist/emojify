.PHONY: wasm

wasm:
	\
	cargo build \
		--release \
		-p emojify-wasm \
		--target wasm32-unknown-unknown && \
	wasm-bindgen target/wasm32-unknown-unknown/release/emojify_wasm.wasm \
		--out-name wasm \
		--out-dir pkg \
		--typescript \
		--target web && \
	wasm-opt pkg/wasm_bg.wasm \
		-o pkg/wasm_bg.wasm-opt.wasm \
		-O && \
	mv pkg/wasm_bg.wasm-opt.wasm pkg/wasm_bg.wasm;
