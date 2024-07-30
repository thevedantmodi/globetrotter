##############################################################
#
#                     json-uploader.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     24 Jul 2024
#
#
#     Upload airports.json to MongoDB server
#
##############################################################

import json
import os

import requests

PATH = "/Users/vedantmodi/Desktop/dev-work.nosync/closed-flights/data-treatment/"

INPUT_DIR = "airports-geo"

for filename in sorted(os.listdir(os.path.join(PATH, INPUT_DIR))):
    with open(os.path.join(PATH, INPUT_DIR, filename)) as f:
        data = json.load(f)

        # print(data, file=sys.stderr)
        response = requests.post("http://localhost:8800/api/airports", json=data)
        # print(response.json())
