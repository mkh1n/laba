DROP DATABASE IF EXISTS demo_lab;

CREATE DATABASE demo_lab;

\c demo_lab

CREATE USER demo_user WITH ENCRYPTED PASSWORD 'demo_pass';

GRANT ALL PRIVILEGES ON DATABASE demo_lab TO demo_user;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE points (
    id BIGSERIAL PRIMARY KEY,
    x DOUBLE PRECISION,
    y DOUBLE PRECISION,
    r DOUBLE PRECISION,
    is_valid BOOLEAN,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
