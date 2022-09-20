import { client } from "../index.js";

export async function getDBUserByEmail(data) {
  return client.db("CRM").collection("users").findOne(data);
}

export function registerUser(data) {
  return client.db("CRM").collection("users").insertOne(data);
}

export function insertToken(data, hashedResetToken) {
  return client
    .db("CRM")
    .collection("users")
    .updateOne(data, {
      $set: { token: hashedResetToken, createdAt: new Date() },
    });
}

export function getToken(data) {
  return client.db("CRM").collection("users").findOne(data);
}

export function updatePassword(query, updateQuery) {
  return client.db("CRM").collection("users").updateOne(query, updateQuery);
}
export function deleteToken(token) {
  return client
    .db("CRM")
    .collection("users")
    .updateOne({ token: token }, { $unset: { token: "" } });
}
export async function verifyEmailToken(data) {
  return client.db("CRM").collection("users").findOne(data);
}

export function activatateUser(token) {
  return client
    .db("CRM")
    .collection("users")
    .updateOne({ token: token }, { $set: { isActive: true } });
}

export function insertAccountConfirmationCode(data, confirmationToken) {
  return client
    .db("CRM")
    .collection("users")
    .updateOne(data, {
      $set: { confirmationToken: confirmationToken },
    });
}

export async function isUserActive(data) {
  return client.db("CRM").collection("users").findOne(data);
}
