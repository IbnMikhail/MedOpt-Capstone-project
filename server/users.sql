CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  drug_id INTEGER REFERENCES drugs(id),
  user_id INTEGER REFERENCES users(id),
  search VARCHAR(255),
  results JSON
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  med_history TEXT, 
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  onlineStatus SMALLINT DEFAULT 0
);