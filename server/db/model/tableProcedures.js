const tablesProcedure = `
CREATE PROCEDURE IF NOT EXISTS CreateTables()

BEGIN
    -- Create User table
    CREATE TABLE IF NOT EXISTS User (
        user_id CHAR(36) PRIMARY KEY,
        full_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
    );

    -- Create Event table
    CREATE TABLE IF NOT EXISTS Event (
        event_id CHAR(36) PRIMARY KEY,
        organizer_id CHAR(36),
        title VARCHAR(255),
        description VARCHAR(255),
        location VARCHAR(255),
        start_time DATETIME,
        end_time DATETIME,
        is_public BOOLEAN,
        created_at TIMESTAMP,
        FOREIGN KEY (organizer_id) REFERENCES User(user_id)
    );

    -- Create Reservation table
    CREATE TABLE IF NOT EXISTS Reservation (
        reservation_id CHAR(36) PRIMARY KEY,
        event_id CHAR(36),
        attendee_id CHAR(36),
        created_at TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES Event(event_id),
        FOREIGN KEY (attendee_id) REFERENCES User(user_id)
    );

END
`;

module.exports = tablesProcedure;
