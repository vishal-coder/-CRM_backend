import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  MarkLeadAsContact,
} from "../controllers/LeadController.js";
import {
  createServiceRequest,
  getServiceRequests,
  updateServiceStatus,
} from "../controllers/ServiceController.js";

import { leadValidation } from "../validations/LeadValidation.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("lead route working");
});

router.post("/create", createServiceRequest);
router.post("/getAll", getServiceRequests);
router.put("/update", updateServiceStatus);

export const serviceRouter = router;
