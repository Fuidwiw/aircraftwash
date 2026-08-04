"""Create web-ready image derivatives while preserving untouched originals."""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
SOURCE_DIR = IMAGE_DIR / "source"

SOURCE_IMAGES = (
    "hero-aircraft.jpg",
    "aircraft-1.jpg",
    "aircraft-2.jpg",
    "aircraft-3.jpg",
)

DISPLAY_SPECS = {
    "ozark-aircraft-wash-logo": ("hero-aircraft.jpg", (480, 768, 1200)),
    "yellow-black-aircraft-exterior": ("aircraft-1.jpg", (320, 500)),
    "yellow-black-aircraft-hangar-side": ("aircraft-2.jpg", (480, 768, 960)),
    "yellow-black-aircraft-glossy-nose": ("aircraft-3.jpg", (480, 768, 960)),
}


def save_derivatives(
    source_path: Path, output_stem: str, widths: tuple[int, ...]
) -> None:
    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        for width in widths:
            if width > image.width:
                continue

            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            base = IMAGE_DIR / f"{output_stem}-{width}"
            resized.save(
                base.with_suffix(".jpg"),
                "JPEG",
                quality=88,
                optimize=True,
                progressive=True,
            )
            resized.save(
                base.with_suffix(".webp"),
                "WEBP",
                quality=86,
                method=6,
            )
            resized.save(
                base.with_suffix(".avif"),
                "AVIF",
                quality=65,
            )

        largest_width = max(width for width in widths if width <= image.width)
        largest_height = round(image.height * largest_width / image.width)
        fallback = image.resize(
            (largest_width, largest_height), Image.Resampling.LANCZOS
        )
        fallback.save(
            IMAGE_DIR / f"{output_stem}.jpg",
            "JPEG",
            quality=88,
            optimize=True,
            progressive=True,
        )


def save_social_image(source_path: Path) -> None:
    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        social = ImageOps.contain(image, (1200, 630), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (1200, 630), "white")
        offset = ((1200 - social.width) // 2, (630 - social.height) // 2)
        canvas.paste(social, offset)
        canvas.save(
            IMAGE_DIR / "og-aircraft.jpg",
            "JPEG",
            quality=88,
            optimize=True,
            progressive=True,
        )


def main() -> None:
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    for filename in SOURCE_IMAGES:
        archived = SOURCE_DIR / filename
        current = IMAGE_DIR / filename
        if not archived.exists():
            if not current.exists():
                raise FileNotFoundError(f"Missing source image: {current}")
            shutil.copy2(current, archived)

    for output_stem, (source_filename, widths) in DISPLAY_SPECS.items():
        save_derivatives(SOURCE_DIR / source_filename, output_stem, widths)

    save_social_image(SOURCE_DIR / "hero-aircraft.jpg")

    before = sum((SOURCE_DIR / name).stat().st_size for name in SOURCE_IMAGES)
    fallbacks = sum(
        (IMAGE_DIR / f"{output_stem}.jpg").stat().st_size
        for output_stem in DISPLAY_SPECS
    )
    print(f"Archived source payload: {before} bytes")
    print(f"Optimized JPEG fallback payload: {fallbacks} bytes")


if __name__ == "__main__":
    main()
