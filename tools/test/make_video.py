"""Gera .cache/hands.mjpeg: um vídeo MJPEG (640x480, 30 fps) usado como câmera falsa no Chromium.

Cada cena mostra uma foto de mão de teste do MediaPipe: 1 s parada (mede tremor)
e 2 s andando em círculo (mede atraso/perda). O Chromium repete o arquivo em loop.

--hard gera .cache/hands_hard.mjpeg, parecido com a câmera de um celular no óculos:
mãos menores (~1/3 da altura), giradas, rápidas, borradas pelo movimento, cena escura
com ruído, às vezes cortadas na borda de baixo, e uma cena sem mão (mede mão fantasma).

Cada vídeo ganha um .json com o nome e a duração das cenas (o smoke.mjs usa).
Uso: python3 tools/test/make_video.py [--hard]   (depois de fetch-assets.sh)
"""
import io
import json
import math
import os
import random
import sys

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


def jpeg(fr, q=88):
    buf = io.BytesIO()
    fr.save(buf, "JPEG", quality=q)
    return buf.getvalue()


HARD = [  # nome, arquivo, altura (fração), ângulo, centro (x, y) em fração do quadro
    ("apontando", "pointing_up.jpg", 0.36, -18, (0.45, 0.55)),
    ("vitória", "victory.jpg", 0.34, 22, (0.6, 0.5)),
    ("dorso (2 mãos)", "right_hands.jpg", 0.40, 0, (0.5, 0.5)),
    ("cortada embaixo", "pointing_up.jpg", 0.42, 8, (0.5, 0.86)),
    ("joinha", "thumb_up.jpg", 0.32, -25, (0.38, 0.45)),
    ("punho", "fist.jpg", 0.32, 15, (0.62, 0.55)),
    ("sem mão", None, 0, 0, (0.5, 0.5)),
]


def degrade(fr, rng):
    # cena interna escura de celular: menos luz, contraste baixo e ruído do sensor
    fr = fr.point(lambda v: int(255 * (v / 255) ** 1.35 * 0.62))
    noise = Image.effect_noise((W, H), 22).convert("RGB")
    return Image.blend(fr, noise, 0.10)


def hard():
    rng = random.Random(7)
    frames, scenes = [], []
    for name, f, frac, ang, (cx, cy) in HARD:
        n0 = len(frames)
        if f is None:
            bg = backdrop(Image.open(os.path.join(C, "victory.jpg")).convert("RGB").crop((0, 0, 60, 60)))
            for i in range(60):
                frames.append(jpeg(degrade(bg, rng), 70))
            scenes.append({"name": name, "frames": len(frames) - n0})
            continue
        img = Image.open(os.path.join(C, f)).convert("RGB")
        h = int(H * frac)
        w = int(img.width * h / img.height)
        hand = img.resize((w, h), Image.LANCZOS).convert("RGBA").rotate(ang, Image.BICUBIC, expand=True)
        bg = backdrop(img)
        rad, per = 95, 45  # círculo rápido: 95 px a cada 1,5 s
        prev = None
        for i in range(90):
            a = 0 if i < 15 else (i - 15) / per * 2 * math.pi
            x = cx * W + math.sin(a) * rad - hand.width / 2
            y = cy * H + (1 - math.cos(a)) * rad * 0.45 - hand.height / 2
            fr = bg.copy()
            # borrão de movimento: média de cópias ao longo do deslocamento desde o quadro anterior
            pts = [(x, y)] if prev is None else [(prev[0] + (x - prev[0]) * k / 4, prev[1] + (y - prev[1]) * k / 4) for k in range(5)]
            acc = None
            for px, py in pts:
                g = bg.copy()
                g.paste(hand, (int(px), int(py)), hand)
                acc = g if acc is None else Image.blend(acc, g, 1 / (pts.index((px, py)) + 1))
            prev = (x, y)
            frames.append(jpeg(degrade(acc, rng), 70))
        scenes.append({"name": name, "frames": len(frames) - n0})
    with open(os.path.join(C, "hands_hard.mjpeg"), "wb") as out:
        out.write(b"".join(frames))
    json.dump({"fps": FPS, "scenes": scenes}, open(os.path.join(C, "hands_hard.json"), "w"), ensure_ascii=False)
    print(f"hands_hard.mjpeg: {len(frames)} quadros, {len(frames) / FPS:.1f} s")


def main():
    if "--hard" in sys.argv:
        return hard()
    out = open(os.path.join(C, "hands.mjpeg"), "wb")
    n = 0
    names = ["apontando", "vitória", "dorso", "duas mãos", "joinha", "punho"]
    json.dump({"fps": FPS, "scenes": [{"name": k, "frames": STILL + MOVE} for k in names]}, open(os.path.join(C, "hands.json"), "w"), ensure_ascii=False)
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
