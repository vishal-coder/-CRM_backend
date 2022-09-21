import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/ContactController.js";

import { ContactValidation } from "../validations/ContactValidation.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Contact route working");
});

router.post("/create", ContactValidation(), createContact);
router.post("/getAll", getContacts);

export const contactRouter = router;
