##############################################################
#
#                     csv-to-json.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     23 Jul 2024
#
#
#     Script to convert mborsetti's airportsdata repository
#     from CSV to JSON. Dataset is used under the MIT license,
#     and can be found at https://github.com/mborsetti/airportsdata
#
##############################################################

import csv
import json

with open("airports.csv") as infile:
    reader = csv.DictReader(infile)
    data = [row for row in reader]
    
with open("airports.json", 'w') as outfile:
    json.dump(data, outfile)
