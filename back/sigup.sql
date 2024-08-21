UPDATE flights
SET passenger_id = 27
WHERE id = 1
RETURNING *;