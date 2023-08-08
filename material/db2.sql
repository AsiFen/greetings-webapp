CREATE TABLE greetings (
    count INT NOT NULL, 
    id serial not null primary key,
    name varchar(100)
)

CREATE TABLE greeting (
    name VARCHAR(100) PRIMARY KEY,
    count INTEGER NOT NULL
);
