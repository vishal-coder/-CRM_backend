import { body, check, validationResult } from "express-validator";
import express from "express";

export function ContactValidation() {
  return [
    check("firstname").notEmpty(),
    check("lastname").notEmpty(),
    check("phone").notEmpty(),
    check("source").notEmpty(),
    check("createdBy").notEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      console.log(errors);
      return res.status(422).json({
        errors: errors.msg,
      });
    },
  ];
}
