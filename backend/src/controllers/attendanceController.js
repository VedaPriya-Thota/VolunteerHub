const db = require("../config/db");

exports.checkIn = async (req, res) => {
  try {
    await db.query(
      `INSERT INTO attendance
       (event_id, volunteer_id, checkin_time)
       VALUES (?, ?, NOW())`,
      [req.body.eventId, req.user.id]
    );

    res.json({
      message: "Checked In"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const eventId = req.body.eventId;

    const [attendance] = await db.query(
      `SELECT *
       FROM attendance
       WHERE event_id = ?
       AND volunteer_id = ?
       ORDER BY id DESC
       LIMIT 1`,
      [eventId, req.user.id]
    );

    if (attendance.length === 0) {
      return res.status(404).json({
        message: "Attendance record not found"
      });
    }

    await db.query(
      `UPDATE attendance
       SET checkout_time = NOW()
       WHERE id = ?`,
      [attendance[0].id]
    );

    const [hoursResult] = await db.query(
      `SELECT
        TIMESTAMPDIFF(
          HOUR,
          checkin_time,
          NOW()
        ) AS hours
       FROM attendance
       WHERE id = ?`,
      [attendance[0].id]
    );

    const hours = hoursResult[0].hours || 0;

    await db.query(
      `UPDATE volunteers
       SET hours_completed =
       hours_completed + ?
       WHERE user_id = ?`,
      [hours, req.user.id]
    );

    res.json({
      message: "Checked Out",
      hoursAdded: hours
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};