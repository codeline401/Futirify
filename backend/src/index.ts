import express from "express";
import { ENV } from "./config/env";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
// credentials : true allows frontend to send cookies to backend so that we can authenticate the user
app.use(clerkMiddleware()); // Use Clerk middleware for authentication
// auth obj will be attached to req obj
// credentials : true allows frontend to send cookies to backend so that we can authenticate the user
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parses form data (like from HTML forms)

app.get("/", (req, res) => {
  res.json({
    message:
      "welcome to the Futurify API - Powered by codeline401 on : Postgresql, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "api/users",
      products: "api/products",
      comments: "api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () =>
  console.log(`Server is running on port ${ENV.PORT}`),
);
