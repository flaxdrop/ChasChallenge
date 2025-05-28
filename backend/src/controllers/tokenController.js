import jwt from "jsonwebtoken";

export function refreshToken (req, res) {
    const { id, role } = req.user;
    const token = jwt.sign(
        {id, role, tokenType: "refresh"},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.status(200).json({ message: "Refresh successful", token });
}