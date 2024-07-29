import os

import pandas

path = "./flight-data"

# Read into pandas dataframe
# Count the number of occurrences of each origin, destination
# Save to dictionary


def print_codes(filename: str):
    origins = dict()
    destinations = dict()

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

    origins = sorted(origins.items(), key=(lambda x: x[1]), reverse=True)
    destinations = sorted(destinations.items(), key=(lambda x: x[1]), reverse=True)

    with open("origins.csv", "a") as origin_file:
        for origin in origins:
            print(origin[0], end=",\n", file=origin_file)

    with open("destinations.csv", "a") as destination_file:
        for destination in destinations:
            print(destination[0], end=",\n", file=destination_file)


for root, dirs, file in os.walk(path):
    for f in file:
        print_codes(os.path.join(root, f))
