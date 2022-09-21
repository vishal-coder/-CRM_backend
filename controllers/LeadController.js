import { insertContact } from "../models/ContactModel.js";
import {
  deleteLeadById,
  fetchLeads,
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

    const response = await updateLeadById(id);

    console.log("response of update lead is", response);
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
    const contactResult = await insertContact(contact);

    console.log("MarkLeadAsContact contactResult  is---", contactResult);

    res.status(200).send({
      message: "Lead updated Successfully",
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
