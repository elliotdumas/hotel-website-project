"""Génère brochure/carte-acces.svg : carte d'accès simplifiée pour les plaquettes PDF.

Réutilise les tracés de src/data/roadmap.json (Natural Earth, domaine public),
recadrés sur le nord de la France, aux couleurs de la charte (crème, or, velours).

Usage : python3 scripts/build-brochure-map.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / "src/data/roadmap.json").read_text(encoding="utf-8"))

# Cadre (unités de roadmap.json), au format des vignettes : de Lille au nord à Paris au sud.
X, Y, W, H = 222, 222, 570, 296

CITIES = {
    "lille": ("Lille", "end", -9, 4),
    "amiens": ("Amiens", "end", -9, 4),
    "paris": ("Paris", "start", 10, 6),
    "reims": ("Reims", "start", 9, 4),
}
SHIELDS = ["A26b", "A29", "A1", "A2"]

land = {"fr": "#f3ead9", "be": "#ebe0cc", "gb": "#ebe0cc", "nl": "#ebe0cc", "de": "#ebe0cc", "lu": "#ebe0cc"}

out = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{X} {Y} {W} {H}" '
    'font-family="DM Sans, sans-serif" class="map">',
    f'<rect x="{X}" y="{Y}" width="{W}" height="{H}" fill="#dfe3df"/>',
]
for c in data["countries"]:
    if c["id"] in land:
        out.append(
            f'<path d="{c["d"]}" fill="{land[c["id"]]}" stroke="#c9b48e" stroke-width="0.8"/>'
        )

# Autoroutes
for corridor in data["corridors"]:
    for d in corridor["paths"]:
        out.append(
            f'<path d="{d}" fill="none" stroke="#fbf6ec" stroke-width="5.5" '
            'stroke-linecap="round" stroke-linejoin="round"/>'
        )
        out.append(
            f'<path d="{d}" fill="none" stroke="#b8955c" stroke-width="2.8" '
            'stroke-linecap="round" stroke-linejoin="round"/>'
        )

# Panneaux d'autoroute
for key in SHIELDS:
    x, y = data["shields"][key]
    label = key.rstrip("b")
    out.append(
        f'<g transform="translate({x} {y})"><rect x="-16" y="-9" width="32" height="18" rx="3" '
        f'fill="#473d35"/><text y="4.4" text-anchor="middle" font-size="12" font-weight="700" '
        f'fill="#fbf6ec">{label}</text></g>'
    )

# Villes
for key, (name, anchor, dx, dy) in CITIES.items():
    x, y = data["cities"][key]
    out.append(f'<circle cx="{x}" cy="{y}" r="4.5" fill="#473d35"/>')
    out.append(
        f'<text x="{x + dx}" y="{y + dy}" text-anchor="{anchor}" font-size="20" '
        f'font-weight="600" fill="#2b231e">{name}</text>'
    )

# Saint-Quentin
sx, sy = data["cities"]["saint-quentin"]
out.append(f'<circle cx="{sx}" cy="{sy}" r="26" fill="#6e1f2a" fill-opacity="0.14"/>')
out.append(f'<circle cx="{sx}" cy="{sy}" r="9" fill="#6e1f2a" stroke="#fbf6ec" stroke-width="2.5"/>')
out.append(
    f'<text x="{sx + 15}" y="{sy - 12}" font-family="Cormorant, Georgia, serif" font-size="32" '
    f'font-weight="600" fill="#6e1f2a">Saint-Quentin</text>'
)
out.append("</svg>")

svg = "\n".join(out)
(ROOT / "brochure/carte-acces.svg").write_text(svg + "\n", encoding="utf-8")

# Insère aussi la carte en ligne dans la plaquette séminaires (pour qu'elle utilise ses polices).
html_path = ROOT / "brochure/plaquette-seminaires.html"
html = html_path.read_text(encoding="utf-8")
start, end = "<!-- carte:debut -->", "<!-- carte:fin -->"
if start in html and end in html:
    before, rest = html.split(start, 1)
    _, after = rest.split(end, 1)
    html_path.write_text(before + start + "\n" + svg + "\n" + end + after, encoding="utf-8")
print("brochure/carte-acces.svg")
