##############################################################
#
#                     airports-ranker.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     29 Jul 2024
#
#
#     Take a list of airport ICAOs sorted by most incoming/
#     outgoing flights.
#
##############################################################

import csv

FILE = "origins.csv"
OUTPUT = "airports-ranked.csv"
# FILE = "destinations.csv"

# Create fields code, size

LARGE_BOUND = 300
MEDIUM_BOUND = 750
SMALL_BOUND = 750

# Output as CSV

fields = ["icao", "size"]

i = open(FILE, "r")
o = open(OUTPUT, "w")


cw = csv.writer(o)
cw.writerow(fields)


def ranker(index):
    if index <= LARGE_BOUND:
        return "large"
    elif index <= MEDIUM_BOUND:
        return "medium"
    else:
        return "small"


for index, line in enumerate(i):
    row = [line[:4], ranker(index)]
    cw.writerow(row)


i.close()
o.close()
