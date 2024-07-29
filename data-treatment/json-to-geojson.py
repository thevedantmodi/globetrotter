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

import pandas

URL = "airports.json"
PATH = "/Users/vedantmodi/Desktop/dev-work.nosync/closed-flights/data-treatment/"
OUT_FILE = "airports.geo.json"
OUT_DIR = "airports-geo"
SIZE_URL = "airports-ranked.csv"

sizes_df = pandas.read_csv(SIZE_URL)

# Create airports-geo directory to place output in
os.makedirs(os.path.join(PATH, OUT_DIR), exist_ok=True)

# Each Feature is a separate airport, contain in a FeatureCollection
with open(os.path.join(PATH, URL)) as f:
    parsed = json.load(f)

    for line in parsed:
        # Inject new size field into airport
        try:
            line.update({"size": sizes_df.loc[line["icao"], "size"]})
        except KeyError:
            line.update({"size": "small"})
        geoJSON = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [line["lon"], line["lat"]],
            },
            "properties": line,
        }

        name = line["icao"] + ".json"
        with open(
            os.path.join(PATH, OUT_DIR, name),
            "w",
        ) as o:
            json.dump(geoJSON, o)
