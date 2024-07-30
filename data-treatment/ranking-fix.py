##############################################################
#
#                     ranking-fix.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     30 Jul 2024
#
#
#     Demote/Promote ranking of airports' size created by dataset bias
#
##############################################################


# IATA NEW_SIZE

# Read in code, size from stdin

# Update in mongodb collection the size at the code

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


find_query = {"properties.iata": "HYD"}
new_value = "large"
updation = {"$set": {"properties.size": new_value}}
update_result = collection.update_one(find_query, updation)

assert update_result

verify_result = collection.find_one(find_query)

assert verify_result["properties"]["size"] == new_value


client.close()
