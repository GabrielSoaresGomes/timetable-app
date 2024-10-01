DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS teacher CASCADE;
DROP TABLE IF EXISTS room CASCADE;

CREATE TABLE IF NOT EXISTS teacher (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES room(id),
    teacher_id INTEGER REFERENCES teacher(id),
    time_start TIMESTAMPTZ,
    time_end TIMESTAMPTZ
);

INSERT INTO teacher (name) VALUES ('Professor A');
INSERT INTO teacher (name) VALUES ('Professor B');

INSERT INTO room (name) VALUES ('Sala A');
INSERT INTO room (name) VALUES ('Sala B');

INSERT INTO schedules (room_id, teacher_id, time_start, time_end) VALUES (1, 1, '2024-10-01 19:00:00', '2024-10-01 22:00:00');

