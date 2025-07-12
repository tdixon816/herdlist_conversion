CREATE TABLE animal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50) UNIQUE,
  markings VARCHAR(50),
  sex ENUM('Steer','Female','Freemartin','?','Bull'),
  notes VARCHAR(100),
  enterprise_owner ENUM('dairy','beef','other') NOT NULL DEFAULT 'beef',
  date_of_birth DATE,
  organic_status BOOLEAN,  -- true/false
  dam_id INT,              -- reference to another animal
  sire_id INT,             -- reference to another animal
  animal_type ENUM('cow','pig','goat','sheep','other') NOT NULL DEFAULT 'cow',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- foreign keys referencing this same table
  FOREIGN KEY (dam_id) REFERENCES animal(id),
  FOREIGN KEY (sire_id) REFERENCES animal(id)
);

CREATE TABLE lease (
  id INT AUTO_INCREMENT PRIMARY KEY,
  acres DECIMAL(8,2) NOT NULL,
  distance_from_farm DECIMAL(6,2) NOT NULL, -- e.g. miles
  est_yield_dm_per_acre_year DECIMAL(8,2) NOT NULL,
  cost_per_acre DECIMAL(8,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE field (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lease_id INT NOT NULL,
  field_name VARCHAR(100),
  acre_size DECIMAL(8,2),
  notes TEXT,
  FOREIGN KEY(lease_id) REFERENCES lease(id)
);

CREATE TABLE history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  field_id INT NOT NULL,
  entry_date DATE NOT NULL,
  notes TEXT,
  FOREIGN KEY(animal_id) REFERENCES animal(id),
  FOREIGN KEY(field_id) REFERENCES field(id)
);

CREATE TABLE field_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  field_id INT NOT NULL,
  line_voltage decimal(8,2),
  date_checked datetime,
  who_checked varchar(50),
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(field_id) REFERENCES field(id)
);

CREATE TABLE animal_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  event_type ENUM('birth','vaccination','weaning','treatment','movement','weight','breeding','sale','death') NOT NULL,
  event_date DATE NOT NULL,
  notes TEXT,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(animal_id) REFERENCES animal(id)
);
