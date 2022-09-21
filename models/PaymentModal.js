import { ObjectId } from "mongodb";
import { client } from "../index.js";

export function updatePaymentId(id, paymentId) {
  console.log("indide updatePaymentId model");
  const query = { $set: { paymentInfo: { paymentLinkId: paymentId } } };
  return client
    .db("CRM")
    .collection("contacts")
    .updateOne({ _id: ObjectId(id) }, query);
}

export function updatePaymentStatus(PaymentLinkId, paymentId) {
  console.log("indide updatePaymentId model");
  const query = {
    $set: { "paymentInfo.paymentId": paymentId, status: "Payment Done" },
  };
  return client
    .db("CRM")
    .collection("contacts")
    .updateOne({ "paymentInfo.paymentLinkId": PaymentLinkId }, query);
}
