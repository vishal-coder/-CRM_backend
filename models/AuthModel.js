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

export async function fetchAllUsers(username, userType) {
  if (userType === "Admin") {
    return client
      .db("CRM")
      .collection("users")
      .find(
        {},
        {
          firstname: 1,
          lastname: 1,
          phone: 1,
          username: 1,
          parent: 1,
          userType: 1,
          isActive: 1,
          token: 0,
          password: 0,
        }
      )
      .toArray();
  } else {
    return client
      .db("CRM")
      .collection("users")
      .find(
        { parent: username },
        {
          firstname: 1,
          lastname: 1,
          phone: 1,
          username: 1,
          parent: 1,
          userType: 1,
          isActive: 1,
          token: 0,
          password: 0,
        }
      )
      .toArray();
  }
}
