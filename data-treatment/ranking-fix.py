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

    failed_queries = []

    verify_result = collection.find_one(find_query)
    # If we fail searching with IATA,
    # we should find the data to update with FAA LID
    if not verify_result:
        lid_query = {"properties.lid": code}
        update_result = collection.update_one(lid_query, updation)

        verify_result = collection.find_one(lid_query)

        try:
            assert verify_result
        except AssertionError:
            failed_queries.append(code)
            continue

        print(verify_result)

        assert verify_result["properties"]["size"] == new_size
    else:
        update_result = collection.update_one(find_query, updation)
        assert update_result

        verify_result = collection.find_one(find_query)

        assert verify_result

        print(verify_result)

        assert verify_result["properties"]["size"] == new_size


print("Finished with these failed queries:", failed_queries)

client.close()
