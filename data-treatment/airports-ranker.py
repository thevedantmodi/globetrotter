import os

import pandas

path = "./flight-data"

# Read into pandas dataframe
# Count the number of occurrences of each origin, destination
# Save to dictionary

origins = dict()
destinations = dict()


def read():
    for root, dirs, file in os.walk(path):
        for f in file:
            filename = os.path.join(root, f)
            return pandas.read_csv(filename)


df = read()
