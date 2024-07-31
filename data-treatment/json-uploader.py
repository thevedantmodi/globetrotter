##############################################################
#
#                     json-uploader.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     24 Jul 2024
#
#
#     Upload airports.json to MongoDB server
#
##############################################################

import json
import os

import certifi
from dotenv import load_dotenv
from pymongo import InsertOne
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
uri = os.getenv("MONGO_URL")


PATH = "/Users/vedantmodi/Desktop/dev-work.nosync/closed-flights/data-treatment/"
INPUT_DIR = "airports-geo"


client = MongoClient(uri, server_api=ServerApi("1"), tlsCAFile=certifi.where())
database = client["closed-flights"]
collection = database["airports"]

requesting = []

for filename in sorted(os.listdir(os.path.join(PATH, INPUT_DIR))):
    print(os.path.join(PATH, INPUT_DIR, filename))
    # break
    with open(os.path.join(PATH, INPUT_DIR, filename)) as f:
        data = json.load(f)
        requesting.append(InsertOne(data))

result = collection.bulk_write(requesting)
client.close()
