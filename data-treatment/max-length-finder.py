##############################################################
#
#                     max-length-finder.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     15 Aug 2024
#
#
#     Find the max prop length in all airports
#
##############################################################
import json

path = "./airports.geo.json"
prop = "tz"

subds_len = []

with open(path) as json_file:
    data = json.load(json_file)

    for obj in data["features"]:
        subds_len.append(len(obj["properties"][prop]))

    print(max(subds_len))
