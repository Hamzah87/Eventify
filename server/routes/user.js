const express = require("express");
const db = require("../db/config/db.config");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

// Create a new event
router.post("/events", verifyToken, async (req, res) => {
  try {
    const { title, description, location, startTime, endTime, isPublic } =
      req.body;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const query = `
      INSERT INTO Event (
        event_id,
        organizer_id,
        title,
        description,
        location,
        start_time,
        end_time,
        is_public,
        created_at
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await db
      .promise()
      .query(query, [
        req.userId,
        title,
        description || null,
        location || null,
        startTime,
        endTime,
        isPublic || false,
      ]);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all events created by the user
router.get("/events", verifyToken, async (req, res) => {
  try {
    const query = `
      SELECT 
        event_id,
        title,
        description,
        location,
        start_time,
        end_time,
        is_public,
        created_at
      FROM Event
      WHERE organizer_id = ?
      ORDER BY created_at DESC
    `;

    const [events] = await db.promise().query(query, [req.userId]);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Create a reservation for an event
router.post("/events/:eventId/reserve", verifyToken, async (req, res) => {
  try {
    // First check if the event exists and is available for reservation
    const [event] = await db
      .promise()
      .query("SELECT * FROM Event WHERE event_id = ?", [req.params.eventId]);

    if (!event || event.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if user already has a reservation
    const [existingReservation] = await db
      .promise()
      .query(
        "SELECT * FROM Reservation WHERE event_id = ? AND attendee_id = ?",
        [req.params.eventId, req.userId]
      );

    if (existingReservation && existingReservation.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already reserved this event",
      });
    }

    // Create the reservation
    const query = `
      INSERT INTO Reservation (
        reservation_id,
        event_id,
        attendee_id,
        created_at
      ) VALUES (UUID(), ?, ?, NOW())
    `;

    const [result] = await db
      .promise()
      .query(query, [req.params.eventId, req.userId]);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservationId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Remove a reservation for an event
router.delete("/events/:eventId/unreserve", verifyToken, async (req, res) => {
  try {
    // First check if the reservation exists for this user and event
    const [existingReservation] = await db
      .promise()
      .query(
        "SELECT * FROM Reservation WHERE event_id = ? AND attendee_id = ?",
        [req.params.eventId, req.userId]
      );

    if (!existingReservation || existingReservation.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reservation found for this event",
      });
    }

    // Delete the reservation
    const query = `
      DELETE FROM Reservation
      WHERE event_id = ? AND attendee_id = ?
    `;

    await db.promise().query(query, [req.params.eventId, req.userId]);

    res.status(200).json({
      success: true,
      message: "Reservation removed successfully",
    });
  } catch (error) {
    console.error("Error removing reservation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get events user is attending
router.get("/events/attending", verifyToken, async (req, res) => {
  try {
    const query = `
      SELECT 
        e.event_id AS EventID,
        e.title AS EventName,
        e.description AS Description,
        e.location AS Location,
        e.start_time AS StartTime,
        e.end_time AS EndTime,
        e.is_public AS IsPublic,
        u.full_name AS OrganizerName,
        r.created_at AS ReservationTime
      FROM Event e
      JOIN Reservation r ON e.event_id = r.event_id
      JOIN User u ON e.organizer_id = u.user_id
      WHERE r.attendee_id = ?
      ORDER BY e.start_time ASC
    `;

    const [events] = await db.promise().query(query, [req.userId]);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Error fetching attended events:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
