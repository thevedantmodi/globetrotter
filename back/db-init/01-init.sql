-- db-init/01-init.sql
-- Create countries table
CREATE TABLE IF NOT EXISTS countries (id VARCHAR(2) PRIMARY KEY);
COPY countries
FROM '/docker-entrypoint-initdb.d/countries.csv' WITH (
        FORMAT CSV,
        HEADER true,
        DELIMITER ','
    );
CREATE TABLE IF NOT EXISTS timezones (id VARCHAR(30) PRIMARY KEY);
COPY timezones
FROM '/docker-entrypoint-initdb.d/timezones.csv' WITH (
        FORMAT CSV,
        HEADER true,
        DELIMITER ','
    );

CREATE TYPE port_size as ENUM('small', 'medium', 'large');


CREATE TABLE IF NOT EXISTS airports (
    iata VARCHAR(3) PRIMARY KEY,
    lat REAL,
    lon REAL,
    country VARCHAR(2) REFERENCES countries(id),
    icao VARCHAR(4),
    tz VARCHAR(30) REFERENCES timezones(id),
    city VARCHAR(500),
    subd VARCHAR(500),
    size port_size
);

COPY airports
FROM '/docker-entrypoint-initdb.d/airports.csv' WITH (
        FORMAT CSV,
        HEADER true,
        DELIMITER ','
    );


CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_pwd VARCHAR(255) NOT NULL,
    hometown VARCHAR(255),
    km_flown INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS flights (
    id BIGSERIAL PRIMARY KEY,
    carrier VARCHAR(2),
    fl_no SMALLINT,

    dep_port VARCHAR(3),
    dep_date TIMESTAMPTZ,

    arr_port VARCHAR(3),
    arr_date TIMESTAMPTZ,

    price MONEY,
    currency VARCHAR(3),

    duration INTERVAL,
    passenger_id BIGINT REFERENCES users(id) 
);