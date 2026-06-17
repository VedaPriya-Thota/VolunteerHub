const db = require("../config/db");

exports.dashboard =
async (req, res) => {

  const [[users]] =
  await db.query(
   "SELECT COUNT(*) total FROM users"
  );

  const [[events]] =
  await db.query(
   "SELECT COUNT(*) total FROM events"
  );

  const [[hours]] =
  await db.query(
   `SELECT
    SUM(hours_completed)
    total
    FROM volunteers`
  );

  res.json({
    totalUsers:
      users.total,
    totalEvents:
      events.total,
    totalHours:
      hours.total || 0
  });

};