"""
Génère src/data/roadmap.json : fond de carte (pays) et grands axes autoroutiers autour de
Saint-Quentin, déjà projetés en coordonnées SVG.

Données : Natural Earth (domaine public), https://www.naturalearthdata.com/
  - ne_50m_admin_0_countries.geojson
  - ne_10m_roads.geojson

Usage :
  python3 scripts/build-roadmap.py chemin/ne_50m_admin_0_countries.geojson chemin/ne_10m_roads.geojson
"""

import json
import math
import sys
from pathlib import Path

# Emprise de la carte (degrés) et largeur du repère SVG
LON_MIN, LON_MAX, LAT_MIN, LAT_MAX = -1.6, 8.6, 45.35, 52.15
WIDTH = 1000


def merc(lat: float) -> float:
    return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


SCALE = WIDTH / math.radians(LON_MAX - LON_MIN)
HEIGHT = round((merc(LAT_MAX) - merc(LAT_MIN)) * SCALE)


def project(lon: float, lat: float) -> tuple[float, float]:
    x = math.radians(lon - LON_MIN) * SCALE
    y = (merc(LAT_MAX) - merc(lat)) * SCALE
    return round(x, 1), round(y, 1)


def simplify(points, tolerance):
    """Douglas-Peucker."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy) or 1e-9
    index, dmax = 0, 0.0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm
        if d > dmax:
            index, dmax = i, d
    if dmax > tolerance:
        return simplify(points[: index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)
    return [points[0], points[-1]]


def path(points, closed=False):
    d = 'M' + ' L'.join(f'{x:g} {y:g}' for x, y in points)
    return d + ('Z' if closed else '')


def in_view(points, margin=150):
    return any(-margin <= x <= WIDTH + margin and -margin <= y <= HEIGHT + margin for x, y in points)


COUNTRIES = {
    'France': 'fr',
    'Belgium': 'be',
    'Luxembourg': 'lu',
    'Germany': 'de',
    'United Kingdom': 'gb',
    'Netherlands': 'nl',
    'Switzerland': 'ch',
    'Italy': 'it',
    'Ireland': 'ie',
}


def build_countries(geojson):
    out = []
    for feature in geojson['features']:
        code = COUNTRIES.get(feature['properties']['ADMIN'])
        if not code:
            continue
        geometry = feature['geometry']
        polygons = (
            [geometry['coordinates']]
            if geometry['type'] == 'Polygon'
            else geometry['coordinates']
        )
        parts = []
        for polygon in polygons:
            ring = [project(lon, lat) for lon, lat in polygon[0]]
            if not in_view(ring):
                continue
            half = len(ring) // 2  # anneau fermé : simplifier en deux moitiés
            ring = simplify(ring[: half + 1], 0.6)[:-1] + simplify(ring[half:], 0.6)
            if len(ring) > 3:
                parts.append(path(ring, closed=True))
        if parts:
            out.append({'id': code, 'd': ' '.join(parts)})
    return out


def lines(feature):
    geometry = feature['geometry']
    return [geometry['coordinates']] if geometry['type'] == 'LineString' else geometry['coordinates']


def box(lon_min, lon_max, lat_min, lat_max):
    def inside(point):
        return lon_min <= point[0] <= lon_max and lat_min <= point[1] <= lat_max

    return inside


def runs(coords, inside):
    """Portions continues d'une ligne situées dans la zone (avec un point de raccord)."""
    out, current = [], []
    for i, point in enumerate(coords):
        if inside(point):
            if not current and i > 0:
                current.append(coords[i - 1])
            current.append(point)
        elif current:
            current.append(point)
            out.append(current)
            current = []
    if current:
        out.append(current)
    return [r for r in out if len(r) > 1]


# Corridors : (identifiant, [(référence européenne, filtre géographique)])
CORRIDORS = [
    (
        'a26',
        [
            ('E15', box(-1.0, 1.45, 50.9, 51.7)),  # Londres – Folkestone (M20)
            ('E15', box(1.45, 3.0, 50.27, 51.1)),  # Calais – Arras (A26)
            ('E17', box(2.6, 4.6, 48.27, 50.32)),  # Arras – Saint-Quentin – Reims – Troyes (A26)
        ],
    ),
    (
        'a29',
        [
            ('E44', box(2.2, 3.29, 49.7, 50.0)),  # Amiens – Saint-Quentin (A29)
            ('E44', box(-0.5, 2.2, 49.3, 49.93)),  # Le Havre – Amiens (A29)
        ],
    ),
    (
        'a1',
        [
            ('E15', box(2.2, 3.0, 48.85, 50.27)),  # Paris – Arras (A1)
            ('E17', box(2.6, 3.3, 50.32, 50.75)),  # Arras – Lille (A1)
            ('E19', box(2.8, 4.6, 49.9, 50.95)),  # Péronne – Valenciennes – Bruxelles (A2 / E19)
        ],
    ),
    (
        'a4',
        [
            ('E50', box(2.4, 6.4, 48.8, 49.4)),  # Paris – Reims – Metz (A4)
            ('E25', box(5.8, 6.5, 49.1, 49.75)),  # Metz – Luxembourg (A31)
            ('E25', box(6.1, 7.9, 48.4, 49.15)),  # Metz – Strasbourg (A4)
            ('E411', box(4.3, 6.2, 49.55, 50.9)),  # Luxembourg – Bruxelles (E411)
        ],
    ),
    (
        'south',
        [
            ('E17', box(3.9, 5.32, 47.6, 48.27)),  # Troyes – Langres (A5)
            ('E21', box(4.6, 5.45, 45.7, 47.85)),  # Langres – Dijon – Lyon (A31 / A6)
        ],
    ),
]

SAINT_QUENTIN = project(3.286268, 49.846108)

# Tronçons absents de Natural Earth à cette échelle : tracés approchés par les villes traversées.
GAP_FILLERS = {
    'south': [
        [(5.33, 47.86), (5.17, 47.52), (5.04, 47.32)],  # Langres – Dijon (A31)
        [(5.04, 47.32), (4.84, 47.02), (4.85, 46.78), (4.83, 46.31), (4.72, 45.99), (4.84, 45.76)],  # Dijon – Lyon (A31 / A6)
    ],
    'a4': [
        [(5.81, 49.68), (6.13, 49.61)],  # Arlon – Luxembourg (E411)
        [(6.13, 49.61), (6.17, 49.36), (6.18, 49.12)],  # Luxembourg – Thionville – Metz (A31)
    ],
    'a1': [
        [(2.52, 49.0), (2.37, 48.93), (2.35, 48.87)],  # Roissy – Paris (A1)
    ],
}


def build_roads(geojson):
    corridors = []
    for corridor_id, rules in CORRIDORS:
        segments = []
        for feature in geojson['features']:
            props = feature['properties']
            if props.get('type') == 'Ferry Route':
                continue
            for ref, test in rules:
                if props.get('label') != ref:
                    continue
                for coords in (r for line in lines(feature) for r in runs(line, test)):
                    points = simplify([project(lon, lat) for lon, lat in coords], 0.5)
                    # Sens du tracé : vers Saint-Quentin (pour l'animation du flux)
                    d0 = math.dist(points[0], SAINT_QUENTIN)
                    d1 = math.dist(points[-1], SAINT_QUENTIN)
                    if d0 < d1:
                        points.reverse()
                    segments.append(path(points))
        for line in GAP_FILLERS.get(corridor_id, []):
            points = [project(lon, lat) for lon, lat in line]
            if math.dist(points[0], SAINT_QUENTIN) < math.dist(points[-1], SAINT_QUENTIN):
                points.reverse()
            segments.append(path(points))
        corridors.append({'id': corridor_id, 'paths': segments})
    return corridors


def main():
    countries = json.loads(Path(sys.argv[1]).read_text())
    roads = json.loads(Path(sys.argv[2]).read_text())

    cities = {
        'saint-quentin': (3.286268, 49.846108),
        'london': (-0.1276, 51.5072),
        'calais': (1.8587, 50.9513),
        'lille': (3.0573, 50.6292),
        'brussels': (4.3517, 50.8503),
        'amiens': (2.2958, 49.8941),
        'paris': (2.3522, 48.8566),
        'reims': (4.0317, 49.2583),
        'luxembourg': (6.1296, 49.6116),
        'metz': (6.1757, 49.1193),
        'strasbourg': (7.7521, 48.5734),
        'troyes': (4.0744, 48.2973),
        'dijon': (5.0415, 47.322),
        'lyon': (4.8357, 45.764),
        'cologne': (6.9603, 50.9375),
        'rouen': (1.0993, 49.4431),
    }
    labels = {
        # Positions des étiquettes de pays et de mers
        'gb': (-0.9, 52.0),
        'fr': (1.0, 47.0),
        'be': (4.75, 50.25),
        'nl': (5.3, 51.85),
        'lu': (6.15, 49.95),
        'de': (7.6, 50.25),
        'ch': (7.5, 46.75),
        'channel': (-0.6, 50.15),
        'northsea': (2.6, 51.75),
    }
    shields = {
        'A26': (2.42, 50.62),
        'A26b': (3.83, 49.5),
        'A29': (2.72, 49.98),
        'A1': (2.5, 49.45),
        'A2': (3.75, 50.42),
        'A4': (5.1, 49.27),
        'A31': (6.42, 49.38),
        'A5': (4.7, 47.95),
        'A6': (4.62, 46.4),
        'M20': (0.55, 51.32),
    }
    data = {
        'width': WIDTH,
        'height': HEIGHT,
        'source': 'Natural Earth (domaine public)',
        'countries': build_countries(countries),
        'corridors': build_roads(roads),
        'tunnel': path([project(1.15, 51.09), project(1.81, 50.93)]),
        'cities': {k: project(*v) for k, v in cities.items()},
        'labels': {k: project(*v) for k, v in labels.items()},
        'shields': {k: project(*v) for k, v in shields.items()},
    }
    out = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'roadmap.json'
    out.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')))
    print(out, f'{out.stat().st_size // 1024} Ko', [(c['id'], len(c['paths'])) for c in data['corridors']])


if __name__ == '__main__':
    main()
