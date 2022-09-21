import { ObjectId } from "mongodb";
import { client } from "../index.js";

export function insertLead(data) {
  console.log("indide create lead model");
  return client.db("CRM").collection("leads").insertOne(data);
}

export async function fetchLeads(username, userType) {
  let query = {};
  if (userType === "Employee") {
    query = { createdBy: username };
  } else if (userType === "Manager") {
    query = { $or: [{ parent: username }, { createdBy: username }] };
  }
  return client
    .db("CRM")
    .collection("leads")
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

export function getManagerLeads(username) {
  console.log("inside manager get leads");
  return client
    .db("CRM")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "leads",
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

export function deleteLeadById(id) {
  return client
    .db("CRM")
    .collection("leads")
    .deleteOne({ _id: ObjectId(id) });
}

export function updateLeadById(id) {
  return client
    .db("CRM")
    .collection("leads")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { status: "Marked As Contact" } }
    );
}

export function getLeadById(id) {
  return client
    .db("CRM")
    .collection("leads")
    .findOne({ _id: ObjectId(id) });
}

export async function getLeadByEmail(data) {
  return client.db("CRM").collection("leads").findOne(data);
}
