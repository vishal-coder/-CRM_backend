import { client } from "../index.js";

export function insertServiceRequest(data) {
  console.log("indide create insertServiceRequest");
  return client.db("CRM").collection("servicereqs").insertOne(data);
}

export async function fetchServiceRequest(username, userType) {
  let query = {};
  if (userType === "Employee") {
    query = { createdBy: username };
  } else if (userType === "Manager") {
    query = { $or: [{ parent: username }, { createdBy: username }] };
  }
  return client
    .db("CRM")
    .collection("servicereq")
    .find(query, {
      firstname: 1,
      lastname: 1,
      phone: 1,
      email: 1,
      parent: 1,
      source: 1,
      createdOn: 1,
    })
    .toArray();
}

export function getManagerServiceRequest(username) {
  console.log("inside manager get leads");
  return client
    .db("CRM")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "servicereq",
          localField: "username",
          foreignField: "createdBy",
          as: "leads",
        },
      },
      {
        $match: {
          $or: [{ parent: username }, { username: username }],
        },
      },
      { $project: { _id: 0, leads: 1 } },
      { $unwind: { path: "$leads" } },
    ])
    .toArray();
}

export function updateServiceRequestById(id) {
  return client
    .db("CRM")
    .collection("servicereq")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { status: "Marked As Contact" } }
    );
}
