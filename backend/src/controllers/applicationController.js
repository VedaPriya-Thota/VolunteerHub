const db = require("../config/db");

async function getVolunteerId(req) {
  const [volunteer] = await db.query(
    "SELECT id FROM volunteers WHERE user_id = ?",
    [req.user.id]
  );

  if (volunteer.length === 0) {
    return null;
  }

  return volunteer[0].id;
}

// Volunteer applies for event
exports.applyForEvent = async (req, res) => {
  try {
    const volunteerId = await getVolunteerId(req);

    if (!volunteerId) {
      return res.status(404).json({
        message: "Volunteer profile not found"
      });
    }

    const eventId = req.params.eventId;

    const [existing] = await db.query(
      `SELECT * FROM event_applications
       WHERE event_id = ? AND volunteer_id = ?`,
      [eventId, volunteerId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

    await db.query(
      `INSERT INTO event_applications
       (event_id, volunteer_id)
       VALUES (?, ?)`,
      [eventId, volunteerId]
    );

    res.json({
      message: "Application submitted"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// My applications
exports.getMyApplications = async (req, res) => {
  try {
    const volunteerId = await getVolunteerId(req);

    if (!volunteerId) {
      return res.status(404).json({
        message: "Volunteer profile not found"
      });
    }

    const [applications] = await db.query(
      `
      SELECT
        ea.id,
        ea.status,
        ea.applied_at,
        e.id AS event_id,
        e.title,
        e.location,
        e.event_date
      FROM event_applications ea
      JOIN events e
        ON ea.event_id = e.id
      WHERE ea.volunteer_id = ?
      `,
      [volunteerId]
    );

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Approve
exports.approveApplication = async (req, res) => {

  await db.query(
    `UPDATE event_applications
     SET status='approved'
     WHERE id=?`,
    [req.params.id]
  );

  res.json({
    message: "Approved"
  });
};

// Reject
exports.rejectApplication = async (req, res) => {

  await db.query(
    `UPDATE event_applications
     SET status='rejected'
     WHERE id=?`,
    [req.params.id]
  );

  res.json({
    message: "Rejected"
  });
};