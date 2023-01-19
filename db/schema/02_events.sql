-- Drop and recreate Events table

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  organizer_id INT REFERENCES users(id),
  url_id VARCHAR(255) NOT NULL UNIQUE,
  dateTime CURRENT_TIMESTAMP
);
