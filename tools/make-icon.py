#!/usr/bin/env python3
"""Генерує іконку додатка 1024×1024 (EnglishNotebook/Assets.xcassets/AppIcon.appiconset/AppIcon.png).

Стиль — як .brand-icon на сайті: синій квадрат і білий напис «En.».
iOS сама заокруглює кути, тому фон суцільний, без прозорості.
Запуск: python3 tools/make-icon.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SIZE = 1024
TOP, BOTTOM = (0x25, 0x59, 0xE5), (0x19, 0x3A, 0x91)   # accent → continueBg
OUT = Path(__file__).resolve().parent.parent / "EnglishNotebook/Assets.xcassets/AppIcon.appiconset/AppIcon.png"
FONTS = [
    "/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf",
    "/usr/share/fonts/opentype/inter/Inter-Bold.otf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

img = Image.new("RGB", (SIZE, SIZE))
px = img.load()
for y in range(SIZE):
    t = y / (SIZE - 1)
    px_row = tuple(round(TOP[i] * (1 - t) + BOTTOM[i] * t) for i in range(3))
    for x in range(SIZE):
        px[x, y] = px_row

draw = ImageDraw.Draw(img)
font = None
for path in FONTS:
    if Path(path).exists():
        font = ImageFont.truetype(path, 520)
        break
if font is None:
    raise SystemExit("Не знайдено жирного шрифту для іконки")

text = "En."
bbox = draw.textbbox((0, 0), text, font=font)
w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
x = (SIZE - w) / 2 - bbox[0] - 12          # невеликий зсув ліворуч, бо крапка оптично важча
y = (SIZE - h) / 2 - bbox[1]
draw.text((x, y), text, font=font, fill="white")

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"Збережено {OUT} ({OUT.stat().st_size // 1024} КБ)")
