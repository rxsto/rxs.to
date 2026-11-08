"""Make review sheets containing every required round-twelve capture."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root = Path('/home/dev/worktrees/rxs.to/evidence-climb/r12')
for group, files in [('pages', sorted(root.glob('*.png'))), ('intro', sorted((root / 'intro-options').glob('*.png'))), ('period', sorted((root / 'period-options').glob('*.png'))), ('tooltips', sorted((root / 'crops').glob('*.png')))]:
    for offset in range(0, len(files), 4):
        batch = files[offset:offset + 4]
        images = []
        for file in batch:
            image = Image.open(file).convert('RGB')
            image.thumbnail((640, 3000))
            images.append(image)
        sheet = Image.new('RGB', (1320, sum(max(image.height for image in images[i:i+2]) + 40 for i in range(0, len(images), 2))), '#999')
        draw = ImageDraw.Draw(sheet)
        y = 0
        for i in range(0, len(images), 2):
            for j, image in enumerate(images[i:i+2]):
                x = j * 660
                draw.text((x + 8, y + 8), batch[i+j].name, fill='black')
                sheet.paste(image, (x, y + 30))
            y += max(image.height for image in images[i:i+2]) + 40
        sheet.save(root / f'review-{group}-{offset//4+1}.jpg')
