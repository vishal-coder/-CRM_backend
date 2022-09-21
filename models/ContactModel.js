import { client } from "../index.js";

export function insertContact(data) {
  console.log("indide create Contact model");
  return client.db("CRM").collection("contacts").insertOne(data);
}

export async function fetchContacts(username, userType) {
  let query = {};
  if (userType === "Employee") {
    query = { createdBy: username };
  }
  return client
    .db("CRM")
    .collection("contacts")
    .find(query, {
      firstname: 1,
      lastname: 1,
      phone: 1,
      email: 1,
      parent: 1,
      status: 1,
      createdOn: 1,
    })
    .toArray();
}

export function getManagerContacts(username) {
  console.log("inside manager get  getManagerContacts");
  return client
    .db("CRM")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "contacts",
          localField: "username",
          foreignField: "createdBy",
          as: "contactList",
        },
      },
      {
        $match: {
          $or: [{ parent: username }, { username: username }],
        },
      },
      { $project: { _id: 0, contactList: 1 } },
      { $unwind: { path: "$contactList" } },
    ])
    .toArray();
}
