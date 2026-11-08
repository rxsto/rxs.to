"""Build review sheets covering every final and option capture."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path('/home/dev/worktrees/rxs.to/evidence-climb/r13')
for group in ['', 'chevron-options', 'now-options', 'since-options', 'period-options', 'stack-options', 'button-options', 'crops', 'topbars']:
    files = sorted((root / group).glob('*.png'))
    for offset in range(0, len(files), 6):
        batch = files[offset:offset + 6]
        images = []
        for file in batch:
            image = Image.open(file).convert('RGB')
            image.thumbnail((480, 2600))
            images.append(image)
        sheet = Image.new('RGB', (1500, sum(max(image.height for image in images[i:i+3]) + 45 for i in range(0, len(images), 3))), '#aaa')
        draw = ImageDraw.Draw(sheet)
        y = 0
        for i in range(0, len(images), 3):
            for j, image in enumerate(images[i:i+3]):
                x = j * 500
                draw.text((x + 8, y + 8), batch[i+j].name, fill='black')
                sheet.paste(image, (x, y + 35))
            y += max(image.height for image in images[i:i+3]) + 45
        sheet.save(root / f'review-{group or "pages"}-{offset//6+1}.jpg')
