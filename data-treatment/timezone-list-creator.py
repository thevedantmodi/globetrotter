##############################################################
#
#                     timezone-list-creator.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     15 Aug 2024
#
#
#     Creates list of timezones via airports list
#
##############################################################

import csv
import json

path = "./airports.geo.json"
prop = "tz"

tzs = set()

with open(path) as json_file:
    data = json.load(json_file)

    for obj in data["features"]:
        tzs.add(obj["properties"][prop])

with open("timezones.csv", "w") as csvfile:
    fieldnames = ["iata", "lat", "lon", "country", "icao", "tz", "city", "subd", "size"]

    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data_list)