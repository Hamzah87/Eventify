const express = require("express");
const db = require("../db/config/db.config");

const router = express.Router();

router.get("/events/search", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  try {
    const { title, date, organizer } = req.query;
    let query = `
      SELECT 
        e.event_id AS EventID,
        e.title AS EventName,
        u.full_name AS OrganizerName,
        e.start_time AS EventDate
      FROM Event e
      JOIN User u ON e.organizer_id = u.user_id
      WHERE e.is_public = TRUE
    `;
    const params = [];

    if (title) {
      query += " AND LOWER(e.title) LIKE LOWER(?)";
      params.push(`%${title}%`);
    }

    if (date) {
      query += " AND DATE(e.start_time) = ?";
      params.push(date);
    }

    if (organizer) {
      query += " AND LOWER(u.full_name) LIKE LOWER(?)";
      params.push(`%${organizer}%`);
    }

    query += " ORDER BY e.start_time DESC";

    const [rows] = await db.promise().query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/events/all", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  try {
    const query = `
      SELECT 
        e.event_id AS EventID,
        e.title AS EventName,
        u.full_name AS OrganizerName,
        e.location AS Location,
        e.start_time AS StartTime,
        e.end_time AS EndTime
      FROM Event e
      JOIN User u ON e.organizer_id = u.user_id
      WHERE e.is_public = TRUE
      ORDER BY e.start_time DESC
    `;

    const [rows] = await db.promise().query(query);
    res.json(rows);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/events/:eventId", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  try {
    const { eventId } = req.params;

    // get event details
    const eventQuery = `
      SELECT 
        e.event_id AS EventID,
        e.title AS EventName,
        e.description AS Description,
        e.location AS Location,
        e.start_time AS StartTime,
        e.end_time AS EndTime,
        e.created_at AS CreatedAt,
        u.full_name AS OrganizerName,
        u.email AS OrganizerEmail
      FROM Event e
      JOIN User u ON e.organizer_id = u.user_id
      WHERE e.event_id = ?
    `;

    // get attendee info
    const attendeesQuery = `
      SELECT 
        u.full_name AS AttendeeName,
        u.email AS AttendeeEmail,
        r.created_at AS ReservationTime
      FROM Reservation r
      JOIN User u ON r.attendee_id = u.user_id
      WHERE r.event_id = ?
      ORDER BY r.created_at ASC
    `;

    const [eventRows] = await db.promise().query(eventQuery, [eventId]);

    if (eventRows.length === 0) {
      return res.status(404).json({ error: "Event not found or not public" });
    }

    const [attendeesRows] = await db.promise().query(attendeesQuery, [eventId]);

    const eventDetails = {
      ...eventRows[0],
      attendees: attendeesRows,
    };

    res.json(eventDetails);
  } catch (error) {
    console.error("Event details error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
