//utils/users.js
//DB-logic
import pool from "./db.js";
import { v4 as uuidv4 } from "uuid";


export const getUserDetails = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    return result.rows[0];
};

export const getAllUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}


export const createUser = async ({ username, hashedPassword, role}) => {
    console.log("createUser function called with username:", username);
    const id = uuidv4();
    const createdAt = new Date();
    //hash user password


    const result = await pool.query(
        "INSERT INTO users (id, username, hashedpassword, role, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, username, hashedPassword, role, createdAt]

    );
    return result.rows[0];
}