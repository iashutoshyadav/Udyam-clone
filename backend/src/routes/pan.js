import express from "express";
import { verifyPan } from "../controllers/panController.js";
import validateRequest from "../middlewares/validateRequest.js";
import { panSchema } from "../validation/rules.js";

const router = express.Router();
router.post("/verify", validateRequest(panSchema), verifyPan);
export default router;
