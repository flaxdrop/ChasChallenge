import * as userUtils from "../utils/users.js";

export const getAllUsers = async (req, res) => {
    try {
      const users = await userUtils.fetchAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getUserDetails = async (req, res) => {
  try {
    const user = await userUtils.getUserDetailsFromDB(req.user.id);
    res.json(user);
  } catch (error) {
    console.error("Error getting user details:", error);
    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await userUtils.deleteUserFromDB(req.user.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "Deleted user successfully", deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const validRoles = ["user", "admin"];
  
    if (!role) {
      return res.status(400).json({ error: "Missing 'role' in request body" });
    }
  
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
    }
  
    try {
      const updatedUser = await userUtils.updateUserRoleInDB(id, role);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User role updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  