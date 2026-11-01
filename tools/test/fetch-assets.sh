#!/usr/bin/env bash
# Baixa o que o teste precisa para rodar sem depender da CDN durante o teste:
# imagens de mãos de teste do MediaPipe (Apache-2.0), o modelo e o wasm do tasks-vision.
set -euo pipefail
cd "$(dirname "$0")"
C=.cache; mkdir -p "$C/wasm"
V=$(grep -o 'nh = "[^"]*"' ../../src/js/30-hands.js | head -1 | cut -d'"' -f2)
get() { [ -s "$C/$2" ] || curl -fsSL -m 120 -o "$C/$2" "$1"; }
for f in pointing_up.jpg victory.jpg thumb_up.jpg fist.jpg right_hands.jpg; do
  get "https://storage.googleapis.com/mediapipe-assets/$f" "$f"
done
get "https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/woman_hands.jpg" woman_hands.jpg
get "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task" hand_landmarker.task
if [ ! -s "$C/wasm/vision_wasm_internal.wasm" ] || [ "$(cat "$C/wasm/version" 2>/dev/null)" != "$V" ]; then
  T=$(mktemp -d); curl -fsSL -m 300 -o "$T/t.tgz" "https://registry.npmjs.org/@mediapipe/tasks-vision/-/tasks-vision-$V.tgz"
  tar xzf "$T/t.tgz" -C "$T"; cp "$T"/package/wasm/vision_wasm_internal.* "$T"/package/wasm/vision_wasm_nosimd_internal.* "$C/wasm/"
  echo "$V" > "$C/wasm/version"; rm -rf "$T"
fi
echo "assets ok (tasks-vision $V)"
