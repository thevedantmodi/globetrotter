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

seen = set()
repeats = []
for obj in df.iterrows():
    iata = obj[1].loc["IATA"]
    airline = obj[1].loc["Airline"]
    if type(iata) is float:
        continue
    # sys.stderr.write("True" if iata in seen else "False")
    if iata in seen:
        repeats.append((iata, airline))

    seen.add(iata)

    #     print(f"{iata[:2]},{airline}")

for iata, airline in repeats:
    print(iata, airline)
