"""Gera .cache/hands.mjpeg: um vídeo MJPEG (640x480, 30 fps) usado como câmera falsa no Chromium.

Cada cena mostra uma foto de mão de teste do MediaPipe: 1 s parada (mede tremor)
e 2 s andando em círculo (mede atraso/perda). O Chromium repete o arquivo em loop.
Uso: python3 tools/test/make_video.py   (depois de fetch-assets.sh)
"""
import io
import math
import os

from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
C = os.path.join(HERE, ".cache")
W, H, FPS = 640, 480, 30
SCENES = [  # arquivo, altura da mão na tela (fração), raio do movimento (px)
    ("pointing_up.jpg", 0.62, 70),
    ("victory.jpg", 0.62, 70),
    ("right_hands.jpg", 0.70, 50),
    ("woman_hands.jpg", 1.00, 30),
    ("thumb_up.jpg", 0.60, 70),
    ("fist.jpg", 0.60, 70),  # punho fechado: não pode virar pinça
]
STILL, MOVE = 30, 60


def backdrop(img):
    # fundo = a própria foto ampliada e borrada, para não criar bordas duras
    bg = img.resize((W, H)).filter(ImageFilter.GaussianBlur(24))
    return bg


def main():
    out = open(os.path.join(C, "hands.mjpeg"), "wb")
    n = 0
    for name, frac, rad in SCENES:
        img = Image.open(os.path.join(C, name)).convert("RGB")
        h = int(H * frac)
        w = int(img.width * h / img.height)
        if w > W:
            w, h = W, int(img.height * W / img.width)
        hand = img.resize((w, h), Image.LANCZOS)
        bg = backdrop(img)
        for i in range(STILL + MOVE):
            a = 0 if i < STILL else (i - STILL) / MOVE * 2 * math.pi
            dx = int(math.sin(a) * rad)
            dy = int((1 - math.cos(a)) * rad * 0.5)
            fr = bg.copy()
            fr.paste(hand, ((W - w) // 2 + dx, (H - h) // 2 + dy))
            buf = io.BytesIO()
            fr.save(buf, "JPEG", quality=88)
            out.write(buf.getvalue())
            n += 1
    out.close()
    print(f"hands.mjpeg: {n} quadros, {n / FPS:.1f} s")


if __name__ == "__main__":
    main()
