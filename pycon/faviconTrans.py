from PIL import Image

# 元画像
input_path = "favicon.png"

img = Image.open(input_path)

img.save("favicon.ico", sizes=[(16,16)])

print("完了")
