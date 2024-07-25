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

URL = "airports-tiny.json"
PATH = "/Users/vedantmodi/Desktop/dev-work/closed-flights/data-treatment/"

with open(os.path.join(PATH, URL)) as f:
    parsed = json.load(f)
    print(parsed)
