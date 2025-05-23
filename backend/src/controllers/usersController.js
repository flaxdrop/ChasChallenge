import * as userUtils from "../utils/users.js";

export const getAllUsers = async (req, res) => {
    console.log("User making request:", req.user); // <- this should be the admin
    const users = await userUtils.fetchAllUsers();
    console.log("Fetched users:", users); // <- should be an array of 4
    res.json(users);
  };
export const getUserDetails = async (req, res) => {
    const user = await userUtils.getUserDetailsFromDB(req.user.id);
    res.json(user);
};

export const deleteUser = async (req, res) => {
    const deletedUser = await userUtils.deleteUserFromDB(req.user.id);
    res.json({
        message: "Deleted user successfully", deletedUser});
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
        return res.status(404).json({ error: `User with id ${id} not found` });
      }
      res.json({ message: "User role updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Failed to update user role:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  