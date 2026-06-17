const db = require("../config/db");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const [profile] = await db.query(
      `SELECT *
       FROM volunteers
       WHERE user_id = ?`,
      [req.user.id]
    );

    if (profile.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { bio, skills, availability } = req.body;

    await db.query(
      `UPDATE volunteers
       SET bio = ?,
           skills = ?,
           availability = ?
       WHERE user_id = ?`,
      [
        bio,
        skills,
        availability,
        req.user.id,
      ]
    );

    res.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};