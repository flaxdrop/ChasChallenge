import * as userUtils from "../utils/users.js";

// Controller to fetch all users (returns filtered user info)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userUtils.fetchAllUsers();
    // Only return selected fields for each user
    const filteredUsers = users.map(({ id, username, role, created_at }) => ({
      id,
      username,
      role,
      created_at,
    }));
    res.json(filteredUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to fetch details for the currently authenticated user
export const getUserDetails = async (req, res) => {
  try {
    const user = await userUtils.getUserDetailsFromDB(req.user.id);
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error("Error getting user details:", error);
    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete the currently authenticated user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userUtils.deleteUserFromDB(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { validate as isUuid } from "uuid";

// Controller to update a user's role (admin/user)
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const validRoles = ["user", "admin"];

  // Validate user ID format
  if (!isUuid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  // Check if role is provided
  if (!role) {
    return res.status(400).json({ error: "Missing 'role' in request body" });
  }

  // Validate role value
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      error: `Invalid role. Valid roles are: ${validRoles.join(", ")}`,
    });
  }

  try {
    // Update user role in the database
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
