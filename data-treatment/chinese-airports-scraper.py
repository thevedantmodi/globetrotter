##############################################################
#
#                     chinese-airports-scraper.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     05 Aug 2024
#
#
#     Imports wikipedia table and exports to stdout as a sorted ranking chart
#     for ranking-fix.py
#
##############################################################

import pandas as pd
import requests
from bs4 import BeautifulSoup

wiki_url = "https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_China"
response = requests.get(wiki_url)
soup = BeautifulSoup(response.text, "html.parser")

airports_list = soup.find("table", attrs={"class": "wikitable sortable"})

df = pd.read_html(str(airports_list))[0]

for obj in df.iterrows():
    iata = obj[1].loc["IATA/ ICAO"][:3]
    num_passengers = obj[1].loc["Passengers"]
    print(f"{iata} {'large' if num_passengers > 2_000_000 else 'medium'}")
