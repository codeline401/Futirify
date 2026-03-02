import dotenv from "dotenv";

dotenv.config({ quiet: true }); // Load environment variables from .env file

export const ENV = {
  PORT: process.env.PORT || 3000, // Default to 3000 if PORT is not set
  DATABASE_URL: process.env.DATABASE_URL, // Database URL for connecting to the database
  NODE_ENV: process.env.NODE_ENV, // Environment (development, production, etc.)
  FRONTEND_URL: process.env.FRONTENS_URL, // Frontend URL for CORS configuration
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY, // Clerk publishable key for authentication
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY, // Clerk secret key for authentication
};
