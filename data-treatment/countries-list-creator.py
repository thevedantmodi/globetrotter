##############################################################
#
#                     countries-list-creator.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     15 Aug 2024
#
#
#     Creates list of countries via airports list
#
##############################################################

import csv
import json

path = "./airports.geo.json"
prop = "country"

countries = set()

with open(path) as json_file:
    data = json.load(json_file)

    for obj in data["features"]:
        countries.add(obj["properties"][prop])


with open("countries.csv", "w") as csvfile:
    fieldnames = ["id"]

    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for c in countries:
        writer.writerow({"id": c})
