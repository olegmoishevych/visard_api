                                Indexes

CREATE INDEX idx_resident_city_id ON residents (city_id);
CREATE INDEX idx_city_name ON cities (name);

SHOW INDEXES FROM residents; - watch indexes in residents
SHOW INDEXES FROM cities - watch indexes in cities

idx_city_name: Speeds up the search for cities by name.
idx_resident_city_id: Speeds up searching for residents by city ID.
