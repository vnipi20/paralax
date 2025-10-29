#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# Розміри в пікселях (234мм × 81мм при 96 DPI)
WIDTH = 884
HEIGHT = 306

# Параметри для трьох зображень
images_config = [
    {'filename': '1.png', 'circle_color': (255, 0, 0), 'circle_size': 20, 'opacity': 26},  # червоне коло, 10% opacity
    {'filename': '2.png', 'circle_color': (0, 255, 0), 'circle_size': 40, 'opacity': 26},  # зелене коло, 10% opacity
    {'filename': '3.png', 'circle_color': (0, 0, 255), 'circle_size': 60, 'opacity': 51},  # синє коло, 20% opacity
]

# Створення зображень для папок 1-10
for folder_num in range(1, 11):
    folder_path = str(folder_num)

    for config in images_config:
        # Створюємо зображення з білим фоном
        img = Image.new('RGBA', (WIDTH, HEIGHT), (255, 255, 255, 255))
        draw = ImageDraw.Draw(img)

        # Координати центру
        center_x = WIDTH // 2
        center_y = HEIGHT // 2

        # Радіус кола
        radius = config['circle_size'] // 2

        # Малюємо коло з прозорістю
        color_with_alpha = config['circle_color'] + (config['opacity'],)
        draw.ellipse(
            [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
            fill=color_with_alpha
        )

        # Зберігаємо зображення
        output_path = os.path.join(folder_path, config['filename'])
        img.save(output_path, 'PNG')
        print(f"Created: {output_path}")

print("\nУсі зображення успішно створено!")
