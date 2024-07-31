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
import sys

import airportsdata
import certifi
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

airports = airportsdata.load("IATA")

load_dotenv()
uri = os.getenv("MONGO_URL")

client = MongoClient(uri, server_api=ServerApi("1"), tlsCAFile=certifi.where())
database = client["closed-flights"]
collection = database["airports"]

for line in sys.stdin:
    if line[0] == "#":
        continue
    res = line.split(" ")
    code, new_size = res
    new_size = new_size[:-1]

    find_query = {"properties.iata": code}
    updation = {"$set": {"properties.size": new_size}}
    update_result = collection.update_one(find_query, updation)

    assert update_result

    verify_result = collection.find_one(find_query)

    print(verify_result)

    assert verify_result["properties"]["size"] == new_size


client.close()
