CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    zone_id INT REFERENCES zones(id),
    amenity_score INT,
    traffic_stress INT,
    green_cover INT,
    economic_activity INT,
    population_density INT
);

CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    zone_id INT REFERENCES zones(id),
    recommended_zone_type VARCHAR(255),
    confidence_score INT,
    urgency_level VARCHAR(50),
    headline_recommendation TEXT,
    reasoning TEXT,
    interventions JSONB,
    estimated_pop_benefit_pct DECIMAL,
    estimated_econ_gain_inr DECIMAL,
    implementation_timeline_years DECIMAL
);
