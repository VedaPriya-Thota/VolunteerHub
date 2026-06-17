const db = require("../config/db");

// CREATE EVENT (Admin only later protected)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, event_date, capacity, ngo_id } = req.body;

    await db.query(
      `INSERT INTO events (title, description, location, event_date, capacity, ngo_id, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, location, event_date, capacity, ngo_id || null, req.user?.id || null]
    );

    res.json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL EVENTS
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM events ORDER BY event_date DESC");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE EVENT
exports.getEvent = async (req, res) => {
  try {
    const [event] = await db.query("SELECT * FROM events WHERE id = ?", [
      req.params.id,
    ]);

    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    await db.query("DELETE FROM events WHERE id = ?", [req.params.id]);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};