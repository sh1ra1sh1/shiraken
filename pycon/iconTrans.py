from PIL import Image

# 元画像
input_path = "icon.png"

# 出力サイズ
sizes = [16, 32, 48, 72, 96, 144, 192, 256, 384, 512]

img = Image.open(input_path)

for size in sizes:
    resized = img.resize((size, size), Image.LANCZOS)
    resized.save(f"icon-{size}x{size}.png")

print("完了")
