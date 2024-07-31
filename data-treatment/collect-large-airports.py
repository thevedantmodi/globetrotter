##############################################################
#
#                     collect-large-airports.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     31 Jul 2024
#
#
#     Script that collects large airports for consideration
#     in the re-ranking process
#
##############################################################

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

find_query = {"$and": [{"properties.country": "US"}, {"properties.size": "large"}]}
results = collection.find(find_query)
for document in results:
    print(document["properties"]["icao"])
