import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { getUserDetails, getAllUsers } from "../utils/users";


const router = express.Router();

//GET all users //todo potentially move to Admin.routes.js
router.get("/", (req, res) => {
    getAllUsers().then((users) => {
        res.json(users);
    });
});

// todo admin allowed to delete other users ?

// routes/User.routes.js
router.get("/me", async (req, res) => {
    // View profile (authenticated)
  });
  
router.delete("/me", async (req, res) => {
    // Delete account (authenticated)
  });


export default router;