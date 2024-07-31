##############################################################
#
#                     export-faa-list.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     31 Jul 2024
#
#
#     Script to create a ranking file for US airports based on FAA rankings
#
##############################################################


import csv

with open("faa-us-airports-ranking.csv", encoding="utf-8-sig") as i:
    csv_reader = csv.DictReader(i)

    for line in csv_reader:
        print(line["code"], line["size"])
