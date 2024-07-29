##############################################################
#
#                     airports-ranker.py
#
#
#     Authored by Vedant Modi (vedantmodi.com)
#     29 Jul 2024
#
#
#     Take a list of airport ICAOs sorted by most incoming/
#     outgoing flights.
#
##############################################################

ORIGINS = "origins.csv"
DESTINATIONS = "destinations.csv"

with open(ORIGINS) as o:
    