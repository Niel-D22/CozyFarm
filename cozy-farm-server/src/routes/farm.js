import { Router } from "express";
import { getPlots, savePlots } from "../controllers/farmController.js";
const r = Router();
r.get("/:wallet",  getPlots);
r.post("/plots",   savePlots);
export default r;
