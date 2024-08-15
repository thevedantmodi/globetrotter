CREATE TABLE IF NOT EXISTS timezones  (
    id VARCHAR(30) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS countries  (
    id VARCHAR(2) PRIMARY KEY
);

SELECT * FROM timezones;

COPY timezones 