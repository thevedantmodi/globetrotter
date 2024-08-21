ALTER TABLE flights ADD COLUMN passenger_id
ALTER TABLE flights ADD FOREIGN KEY (passenger_id) REFERENCES users(id);