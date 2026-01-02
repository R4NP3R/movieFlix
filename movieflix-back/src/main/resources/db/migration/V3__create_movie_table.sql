CREATE TABLE movie (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_date DATE,
  rating NUMERIC,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
)