-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable uuid-ossp for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Table for LGUs (Local Government Units) - Multi-tenancy
CREATE TABLE lgus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(255),
    province VARCHAR(255),
    city_municipality VARCHAR(255),
    configuration JSONB, -- LGU-specific settings, e.g., alert thresholds, communication channels
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., 'Admin', 'Operator', 'Viewer'
    lgu_id UUID REFERENCES lgus(id), -- For multi-tenancy
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for IoT Sensor Readings (TimescaleDB hypertable)
CREATE TABLE sensor_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    station_id VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    sensor_type VARCHAR(50) NOT NULL, -- e.g., 'AWLG', 'ARG', 'AWS'
    value_numeric NUMERIC, -- For AWLG, ARG, temperature, windSpeed
    value_json JSONB, -- For complex AWS data (humidity, etc.)
    location GEOMETRY(Point, 4326) NOT NULL, -- PostGIS point
    metadata JSONB, -- e.g., sensor calibration, status
    CONSTRAINT unique_reading UNIQUE (station_id, timestamp, sensor_type)
);
-- SELECT create_hypertable('sensor_readings', 'timestamp');

-- Table for CCTV Alerts
CREATE TABLE cctv_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id VARCHAR(255) UNIQUE NOT NULL, -- Coram.ai's alert ID
    timestamp TIMESTAMPTZ NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- e.g., 'RapidWaterLevelRise', 'LandslideDetected'
    severity INTEGER NOT NULL, -- 1-5
    source_camera_id VARCHAR(255) NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    raw_data JSONB, -- Raw payload from Coram.ai
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Satellite Imagery Metadata
CREATE TABLE satellite_imagery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    capture_date DATE NOT NULL,
    provider VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL, -- URL to a simulated image or placeholder
    analysis_results JSONB, -- e.g., soil moisture, vegetation index
    coverage_area GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Generated System Alerts
CREATE TABLE system_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id VARCHAR(255) UNIQUE NOT NULL, -- Internal system ID
    timestamp TIMESTAMPTZ NOT NULL,
    area_municipality VARCHAR(255) NOT NULL,
    area_barangay VARCHAR(255),
    geometry GEOMETRY(Polygon, 4326) NOT NULL, -- GeoJSON polygon
    description TEXT NOT NULL,
    severity INTEGER NOT NULL, -- 1-5
    status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- Draft, Pending Review, Approved, Disseminated, Rescinded
    rule_pack_version VARCHAR(50) NOT NULL,
    triggered_rules JSONB, -- Array of rules that fired
    contributing_signals JSONB, -- References to to sensor_readings.id, cctv_alerts.id
    operator_notes TEXT,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_sensor_readings_timestamp ON sensor_readings (timestamp DESC);
CREATE INDEX idx_sensor_readings_location ON sensor_readings USING GIST (location);
CREATE INDEX idx_cctv_alerts_timestamp ON cctv_alerts (timestamp DESC);
CREATE INDEX idx_cctv_alerts_location ON cctv_alerts USING GIST (location);
CREATE INDEX idx_satellite_imagery_capture_date ON satellite_imagery (capture_date DESC);
CREATE INDEX idx_satellite_imagery_coverage_area ON satellite_imagery USING GIST (coverage_area);
CREATE INDEX idx_system_alerts_timestamp ON system_alerts (timestamp DESC);
CREATE INDEX idx_system_alerts_geometry ON system_alerts USING GIST (geometry);
CREATE INDEX idx_system_alerts_status ON system_alerts (status);
CREATE INDEX idx_users_lgu_id ON users (lgu_id);
