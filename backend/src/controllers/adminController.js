const db = require("../config/db");

exports.getStats = async (req, res) => {

  const [[users]] =
  await db.query(
    "SELECT COUNT(*) as total FROM users"
  );

  const [[events]] =
  await db.query(
    "SELECT COUNT(*) as total FROM events"
  );

  const [[applications]] =
  await db.query(
    `SELECT COUNT(*) as total
     FROM event_applications`
  );

  const [[pending]] =
  await db.query(
    `SELECT COUNT(*) as total
     FROM event_applications
     WHERE status='pending'`
  );

  res.json({
    totalUsers: users.total,
    totalEvents: events.total,
    totalApplications: applications.total,
    pendingApplications: pending.total
  });
};

exports.getApplications = async (req, res) => {
  try {

    const [applications] = await db.query(`
      SELECT
        ea.id,
        ea.status,
        ea.applied_at,

        u.name,
        u.email,

        e.title,
        e.location,
        e.event_date

      FROM event_applications ea

      JOIN volunteers v
        ON ea.volunteer_id = v.id

      JOIN users u
        ON v.user_id = u.id

      JOIN events e
        ON ea.event_id = e.id

      ORDER BY ea.applied_at DESC
    `);

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};