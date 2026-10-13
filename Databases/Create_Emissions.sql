PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL,
    unit_name TEXT NOT NULL,
    kg_co2_per_unit REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Activity (
    activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    quantity REAL NOT NULL,
    co2_kg_emitted REAL NOT NULL,
    category_id INTEGER NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (category_id)
        REFERENCES Category(category_id)
);
CREATE TABLE IF NOT EXISTS Goal (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_co2_kg REAL NOT NULL,
    goal_status TEXT,
    start_date TEXT,
    end_date TEXT,
    user_id INTEGER
);

CREATE TABLE IF NOT EXISTS Achievement (
    achievement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    achievement_name TEXT NOT NULL,
    achievement_description TEXT,
    criteria TEXT,
    points INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Earns (
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (achievement_id)
        REFERENCES Achievement(achievement_id)
);

CREATE TABLE IF NOT EXISTS Friends (
    friendship_id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'rejected')),
    request_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    response_date TEXT,
    CHECK (requester_id <> receiver_id),
    UNIQUE (requester_id, receiver_id)
);

