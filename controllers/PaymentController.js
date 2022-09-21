import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

import {
  updatePaymentId,
  updatePaymentStatus,
} from "../models/PaymentModal.js";
export const createPaymentLink = async (req, res) => {
  const { id } = req.body;

  console.log("inside createPaymentLink--", id);
  var instance = new Razorpay({
    key_id: `${process.env.RZ_KEY_ID}`,
    key_secret: `${process.env.RZ_KEY_SECRET}`,
  });

  const link = await instance.paymentLink.create({
    amount: 100000,
    currency: "INR",
    accept_partial: false,
    first_min_partial_amount: 100,
    description: "For XYZ purpose",
    customer: {
      name: "Gaurav Kumar",
      email: "test@test.com",
      contact: "+911234567890",
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    notes: {
      policy_name: "EasyCRM Basic",
    },
    callback_url: `${process.env.REACT_APP_CLIENT}`,
    callback_method: "get",
  });

  const result = await updatePaymentId(id, link.id);
  return res.status(200).send({
    message: "Payment Link Created Successfully",
    success: true,
    paymentLink: link.short_url,
  });
};

export const verifyPaymentStatus = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_reference_id,
    razorpay_payment_link_status,
    razorpay_signature,
  } = req.body;

  const response = validatePaymentVerification(
    {
      payment_link_id: razorpay_payment_link_id,
      payment_id: razorpay_payment_id,
      payment_link_reference_id: razorpay_payment_link_reference_id,
      payment_link_status: razorpay_payment_link_status,
    },
    razorpay_signature,
    `${process.env.RZ_KEY_SECRET}`
  );

  if (response) {
    updatePaymentStatus(razorpay_payment_link_id, razorpay_payment_id);
  }
  return res.status(200).send({
    message: "Payment Verification",
    success: response,
  });
};
