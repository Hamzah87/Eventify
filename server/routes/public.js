const express = require("express");
const db = require("../db/config/db.config");

const router = express.Router();

router.get("/events/search", async (req, res) => {
  let conn;
  try {
    const { title, date, organizer } = req.query;
    let query = `
      SELECT
        Event.EventID,
        Event.EventName,
        GuestList.GuestListOwner,
        Schedule.EventDate
      FROM Event
      JOIN GuestList ON Event.GuestListID = GuestList.GuestListID
      JOIN Schedule ON Event.ScheduleID = Schedule.ScheduleID
      WHERE 1=1
    `;
    const params = [];

    if (title) {
      query += " AND LOWER(Event.EventName) LIKE LOWER(?)";
      params.push(`%${title}%`);
    }

    if (date) {
      query += " AND DATE(Schedule.EventDate) = ?";
      params.push(date);
    }

    if (organizer) {
      query += " AND LOWER(GuestList.GuestListOwner) LIKE LOWER(?)";
      params.push(`%${organizer}%`);
    }

    query += " ORDER BY Schedule.EventDate DESC";

    rows = await db.query(query, params);
    res.json(Array.isArray(rows) ? rows : [rows]);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

router.get("/events/all", async (req, res) => {
  let conn;
  try {
    let query = `
      SELECT
        Event.EventID,
        Event.EventName,
        GuestList.GuestListOwner,
        Schedule.EventDate
      FROM Event
      JOIN GuestList ON Event.GuestListID = GuestList.GuestListID
      JOIN Schedule ON Event.ScheduleID = Schedule.ScheduleID
      ORDER BY Schedule.EventDate DESC
    `;

    rows = await db.query(query, params);
    res.json(Array.isArray(rows) ? rows : [rows]);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

module.exports = router;
