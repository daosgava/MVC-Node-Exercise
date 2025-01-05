import express from "express";
import getAppController from "../controllers/app.mjs";

const router = express.Router();

const { handleHomeRoute } = getAppController();

router.get("/", handleHomeRoute);

export default router;
