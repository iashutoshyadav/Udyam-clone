import express from "express";
import { savePin } from "../controllers/pinController.js";
import validateRequest from "../middlewares/validateRequest.js";
import { pinSaveSchema } from "../validation/rules.js";

const router = express.Router();
router.post("/save", validateRequest(pinSaveSchema), savePin);
export default router;
