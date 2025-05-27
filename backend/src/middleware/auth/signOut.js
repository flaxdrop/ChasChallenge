export const signOut = async (req, res) => {
  try {
    const user_id = req.user.id;
    const token = req.header("Authorization").replace("Bearer ", "");
    
    await pool.query(
      "INSERT INTO blacklist (user_id, minimum_issued_at) VALUES ($1, NOW())",
      [token]
    );
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

