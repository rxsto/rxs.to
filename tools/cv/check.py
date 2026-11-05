"""Check a CV PDF the way machines read it.

Usage: python -I tools/cv/check.py cv.html cv.pdf

Same semantics as the review rounds' check: the words of the HTML body, in order, must be exactly
the words each of four extractors reads from the PDF. The PDF must be one tagged A4 page and use no
characters outside the allowlist.
"""
import re
import sys
from pathlib import Path

import pdfplumber
import pymupdf
import pypdf
from bs4 import BeautifulSoup
from pdfminer.high_level import extract_text

ALLOWED_NON_ASCII = set("·–“”üÜäÄöÖß")
A4 = (595.276, 841.89)

html_path, pdf_path = Path(sys.argv[1]), Path(sys.argv[2])
reader = pypdf.PdfReader(pdf_path)
texts = {
    "pypdf": "\n".join(p.extract_text() for p in reader.pages),
    "pdfminer": extract_text(pdf_path),
    "pymupdf": "".join(p.get_text() for p in pymupdf.open(pdf_path)),
}
with pdfplumber.open(pdf_path) as doc:
    texts["pdfplumber"] = "\n".join(p.extract_text() for p in doc.pages)

expected = BeautifulSoup(html_path.read_text(encoding="utf-8"), "html.parser").body.get_text().split()
failures = []
if len(reader.pages) != 1:
    failures.append(f"pages: {len(reader.pages)}")
box = reader.pages[0].mediabox
if abs(float(box.width) - A4[0]) > 1 or abs(float(box.height) - A4[1]) > 1:
    failures.append(f"page size {float(box.width)}x{float(box.height)} is not A4")
if "/StructTreeRoot" not in reader.trailer["/Root"]:
    failures.append("not tagged")
for name, text in texts.items():
    got = re.sub(r"(?m)^\s*–\s+", "", text).split()
    if got != expected:
        i = next((k for k, (a, b) in enumerate(zip(expected, got)) if a != b), min(len(expected), len(got)))
        failures.append(f"{name}: words differ at word {i}: html={expected[i:i+6]} pdf={got[i:i+6]}")
    odd = sorted({c for c in text if ord(c) > 127} - ALLOWED_NON_ASCII)
    if odd:
        failures.append(f"{name}: unexpected characters {odd}")

links = [a.get_object().get("/A", {}).get("/URI") for a in reader.pages[0].get("/Annots", [])]
print(f"pages={len(reader.pages)} words={len(expected)} tagged={'/StructTreeRoot' in reader.trailer['/Root']} links={links}")
print("PASS" if not failures else "FAIL\n" + "\n".join(failures))
sys.exit(1 if failures else 0)
