import { Router } from "express";
import { syncUser } from "../controllers/usercontroller";
import { requireAuth } from "@clerk/express";

const route = Router();

// api/users/sync - POST => sync the clerk user to db
route.post("/sync", requireAuth(), syncUser);

export default route;
