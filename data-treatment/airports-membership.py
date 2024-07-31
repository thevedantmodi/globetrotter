##############################################################
#
#                     airports-membership.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     31 Jul 2024
#
#
#     Script that checks if an airport is in Mongo collection
#
##############################################################
import os

import certifi
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
uri = os.getenv("MONGO_URL")

code = "ATL"

client = MongoClient(uri, server_api=ServerApi("1"), tlsCAFile=certifi.where())
database = client["closed-flights"]
collection = database["airports"]

find_query = {"properties.iata": code}
verify_result = collection.find_one(find_query)
print(verify_result)

print(collection.count_documents({}))