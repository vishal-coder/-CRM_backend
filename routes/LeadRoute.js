import express from "express";
import { createLead, getLeads } from "../controllers/LeadController.js";

import { leadValidation } from "../validations/LeadValidation.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("lead route working");
});

router.post("/create", leadValidation(), createLead);
router.post("/getAll", getLeads);

export const leadRouter = router;
