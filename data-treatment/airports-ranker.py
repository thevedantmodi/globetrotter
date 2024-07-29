import os

import pandas

path = "./flight-data"

# Read into pandas dataframe
# Count the number of occurrences of each origin, destination
# Save to dictionary

origins = dict()
destinations = dict()


def read_all_csv():
    def get_files():
        files = []
        for root, dirs, file in os.walk(path):
            for f in file:
                filename = os.path.join(root, f)
                files.append(filename)

        return files

    dfs = [pandas.read_csv(file) for file in get_files()]

    return dfs


df = pandas.read_csv("./flight-data/flightlist_20190101_20190131.csv")
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
        print(origin, end=",\n", file=origin_file)

with open("destinations.csv", "a") as destination_file:
    for destination in destinations:
        print(destination, end=",\n", file=destination_file)
