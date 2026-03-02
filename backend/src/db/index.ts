import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environement variables");
}

// initialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is made
pool.on("connect", () => {
  console.log("Database connected successfully ✅");
});

// log when an error occurs
pool.on("error", (err) => {
  console.error("💥 Database connection error:", err);
});

export const db = drizzle({ client: pool, schema });

// A connection pool is a cache of database connection that ar kept et reused
// because, opening/closing connecton is slow. Instaed of creating a new conenection for each request, we reuse existing ones.
// because, database limit concurrent connection. A pool manages a fixed number of connections and shares them across requests.
