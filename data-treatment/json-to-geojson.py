##############################################################
#
#                     json-to-geojson.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     25 Jul 2024
#
#
#     Script to convert airports.json to GeoJSON FeatureCollection
#
##############################################################

import json
import os

URL = "airports.json"
PATH = "/Users/vedantmodi/Desktop/dev-work.nosync/closed-flights/data-treatment/"
OUT_FILE = "airports.geo.json"

# Each Feature is a separate airport, contain in a FeatureCollection

with open(os.path.join(PATH, URL)) as f:
    parsed = json.load(f)

    geoJSON = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [line["lon"], line["lat"]],
                },
                "properties": line,
            }
            for line in parsed
        ],
    }
    with open(os.path.join(PATH, OUT_FILE), "w") as o:
        json.dump(geoJSON, o)
