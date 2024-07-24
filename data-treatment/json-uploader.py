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

URL = "airports.json"
PATH = "/Users/vedantmodi/Desktop/dev-work/closed-flights/data-treatment/"

OUTPUT_PATH = "airports"

os.makedirs(os.path.join(PATH, OUTPUT_PATH), exist_ok=True)

with open(os.path.join(PATH, URL)) as f:
    data = json.load(f)

    for line in data:
        name = line["icao"]

        response = requests.post("http://localhost:8800/api/airports", json=line)
        
        print(response.json())

        # with open(os.path.join(PATH, OUTPUT_PATH, name + ".json"), "w") as o:
        #     json.dump(line, o)
