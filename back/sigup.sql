SELECT iata, COUNT(*) from carriers
GROUP BY iata
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC
;

SELECT * FROM carriers WHERE iata = 'HC';