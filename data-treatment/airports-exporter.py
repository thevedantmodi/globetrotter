##############################################################
#
#                     airports-exporter.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     15 Aug 2024
#
#
#     Script that exports data from MongoDB
#
##############################################################
import csv
import os

import certifi
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
uri = os.getenv("MONGO_URL")

client = MongoClient(uri, server_api=ServerApi("1"), tlsCAFile=certifi.where())
database = client["closed-flights"]
collection = database["airports"]

find_query = {"properties.iata": {"$ne": ""}}
result = collection.find(find_query)

data_list = []

for obj in result:
    data = {
        "iata": obj["properties"]["iata"],
        "lat": obj["properties"]["lat"],
        "lon": obj["properties"]["lon"],
        "country": obj["properties"]["country"],
        "icao": obj["properties"]["icao"],
        "tz": obj["properties"]["tz"],
        "city": obj["properties"]["city"],
        "subd": obj["properties"]["subd"],
        "size": obj["properties"]["size"],
    }
    data_list.append(data)

with open("airports-mongo.csv", "w") as csvfile:
    fieldnames = ["iata", "lat", "lon", "country", "icao", "tz", "city", "subd", "size"]

    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data_list)
