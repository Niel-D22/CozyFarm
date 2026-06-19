import { Router } from "express";
import { getPlayer, createPlayer, savePlayer } from "../controllers/playerController.js";
const r = Router();
r.get("/:wallet",  getPlayer);
r.post("/create",  createPlayer);
r.post("/save",    savePlayer);
export default r;
