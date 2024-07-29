##############################################################
#
#                     airports-list-creator.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     29 Jul 2024
#
#
#     Create list of airports in "popularity" order.
#     Ranking of airports by "small", "medium", "large"
#
##############################################################


import os

import pandas

path = "./flight-data"

# Read into pandas dataframe
# Count the number of occurrences of each origin, destination
# Save to dictionary


origins = dict()
destinations = dict()


def print_codes(filename: str):
    global origins
    global destinations

    df = pandas.read_csv(filename)

    for code in df["origin"]:
        try:
            origins[code] = origins[code] + 1
        except KeyError:
            # First occurrence
            origins.update({code: 1})
    for code in df["destination"]:
        try:
            destinations[code] = destinations[code] + 1
        except KeyError:
            # First occurrence
            destinations.update({code: 1})


for root, dirs, file in os.walk(path):
    for f in file:
        print_codes(os.path.join(root, f))

sorted_origins = sorted(origins.items(), key=(lambda x: x[1]), reverse=True)
sorted_destinations = sorted(destinations.items(), key=(lambda x: x[1]), reverse=True)

with open("origins.csv", "a") as origin_file:
    for origin in sorted_origins:
        print(origin[0], end=",\n", file=origin_file)

with open("destinations.csv", "a") as destination_file:
    for destination in sorted_destinations:
        print(destination[0], end=",\n", file=destination_file)
