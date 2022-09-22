import { newContactEmmiter } from "../EventMonitor/ContactEventMonitor.js";
import { newLeadEmmiter } from "../EventMonitor/LeadEventMonitor.js";
import { client } from "../index.js";
import { insertContact } from "../models/ContactModel.js";
import {
  deleteLeadById,
  fetchLeads,
  getLeadByEmail,
  getLeadById,
  getManagerLeads,
  insertLead,
  updateLeadById,
} from "../models/LeadModel.js";

export const createLead = async (req, res) => {
  try {
    const { firstname, lastname, phone, email, category, createdBy, source } =
      req.body;
    const data = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      category: category,
      createdBy: createdBy,
      source: source,
      createdOn: new Date(),
    };
    console.log("inside createLead--", data);
    const dBLeadByEmail = await getLeadByEmail({ email: email });
    console.log("dBLeadByEmail response  is---", dBLeadByEmail);

    if (dBLeadByEmail) {
      return res
        .status(401)
        .send({ message: "Lead By same Email Already Exists" });
    }
    const pipeline = [
      {
        $match: {
          operationType: "insert",
        },
      },
    ];
    console.log("calling contact emmiter from lead controller");
    newLeadEmmiter(client, 10000, pipeline);
    const response = await insertLead(data);
    console.log("createLead response  is---", response);
    res.status(200).send({
      message: "Lead Created Successfully",
      success: true,
      users: response,
    });
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const { username, userType } = req.body;

    console.log(
      "inside getLeads----------------------------------------------------------",
      username,
      userType
    );
    let response = null;
    if (userType === "Manager") {
      response = await getManagerLeads(username);
    } else {
      response = await fetchLeads(username, userType);
    }
    console.log("getLeads response  is---", response);
    res.status(200).send({
      message: "Lead fetched Successfully",
      success: true,
      leads: response,
    });
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("inside deleteLead----------------", id);

    const response = await deleteLeadById(id);

    console.log("deleteLead response  is---", response);
    res.status(200).send({
      message: "Lead deleted Successfully",
      success: true,
      leads: response,
    });
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};

export const MarkLeadAsContact = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("inside MarkLeadAsContact----------------", id);

    const lead = await getLeadById(id);
    console.log("lead", lead);
    const contact = {
      firstname: lead.firstname,
      lastname: lead.lastname,
      phone: lead.phone,
      email: lead.email,
      category: lead.category,
      createdBy: lead.createdBy,
      category: "Contact",
      status: "Pending Payment",
      createdOn: new Date(),
    };
    console.log("contact", contact);

    const pipeline = [
      {
        $match: {
          operationType: "insert",
        },
      },
    ];
    console.log("calling contact emmiter from lead controller");
    newContactEmmiter(client, 10000, pipeline);
    const contactResult = await insertContact(contact);
    // const response = await updateLeadById(id);
    const response = await deleteLeadById(id);

    console.log("MarkLeadAsContact contactResult  is---", contactResult);

    res.status(200).send({
      message: "Lead updated Successfully",
      success: true,
      leads: response,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};
