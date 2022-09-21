import { ObjectId } from "mongodb";
import { client } from "../index.js";

export function insertServiceRequest(data) {
  console.log("indide create insertServiceRequest");
  return client.db("CRM").collection("servicereqs").insertOne(data);
}

export async function fetchServiceRequest(username, userType) {
  let query = {};
  if (userType === "Employee") {
    query = { createdBy: username };
  }
  return client
    .db("CRM")
    .collection("servicereqs")
    .find(query, {
      _id: 1,
      email: 1,
      description: 1,
      priority: 1,
      status: 1,
      createdBy: 1,
      createdOn: 1,
    })
    .toArray();
}

export function getManagerServiceRequest(username) {
  console.log("inside manager getManagerServiceRequest");
  return client
    .db("CRM")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "servicereqs",
          localField: "username",
          foreignField: "createdBy",
          as: "serviceReq",
        },
      },
      {
        $match: {
          $or: [{ parent: username }, { username: username }],
        },
      },
      { $project: { _id: 0, serviceReq: 1 } },
      { $unwind: { path: "$serviceReq" } },
    ])
    .toArray();
}

export function updateServiceRequestById(id) {
  console.log("inside model serviec", id);
  return client
    .db("CRM")
    .collection("servicereqs")
    .updateOne({ _id: ObjectId(id) }, { $set: { status: "Closed" } });
}
