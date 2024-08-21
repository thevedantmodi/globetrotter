##############################################################
#
#                      iata-carriers-scraper.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     21 Aug 2024
#
#
#     Imports wikipedia table and exports to stdout a complete list
#     of current and historical IATA carriers
#
##############################################################

import pandas as pd
import requests
from bs4 import BeautifulSoup

wiki_url = "https://en.wikipedia.org/wiki/List_of_airline_codes"
response = requests.get(wiki_url)
soup = BeautifulSoup(response.text, "html.parser")

airports_list = soup.find("table", attrs={"class": "wikitable sortable"})

df = pd.read_html(str(airports_list))[0]

lens = []
print("iata,airline")
for obj in df.iterrows():
    iata = obj[1].loc["IATA"]
    airline = obj[1].loc["Airline"]
    if type(airline) is not float:
        lens.append(len(airline))
    if type(iata) is not float:
        print(f"{iata[:2]},{airline}")
    # print(iata) if iata != "nan" else print()


