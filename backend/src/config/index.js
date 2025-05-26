import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'deploy';
export const UNSAFE_ALLOW_MISSING_AUTHENTICATION = (process.env.UNSAFE_ALLOW_MISSING_AUTHENTICATION == 'YES')