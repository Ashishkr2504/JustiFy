import express from "express";
import { getCaptchaImage, trackCaseByCnr } from "../controllers/caseTracker.controller";
const router = express.Router();

router.get("/captcha", getCaptchaImage);    
router.post("/", trackCaseByCnr);

export default router;
