import express from "express";

const router = express.Router();

//GET all users
router.get("/", (req, res) => {
    res.send("Hello from user routes!");
});

//GET one user
router.get("/:id", (req, res) => {
    res.send("Hello from user routes!");
});

// POST new user
router.post("/", (req, res) => {
    res.send("Hello from user routes!");
});


// DELETE one user
router.delete("/:id", (req, res) => {
    res.send("Hello from user routes!");
});

export default router;