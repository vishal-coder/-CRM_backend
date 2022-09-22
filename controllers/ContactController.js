import { newContactEmmiter } from "../EventMonitor/ContactEventMonitor.js";
import {
  fetchContacts,
  getManagerContacts,
  insertContact,
} from "../models/ContactModel.js";

export const createContact = async (req, res) => {
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
      Payment: "Pending",
      createdOn: new Date(),
    };

    const pipeline = [
      {
        $match: {
          operationType: "insert",
        },
      },
    ];
    newContactEmmiter(client, 10000, pipeline);
    const response = await insertContact(data);

    res.status(200).send({
      message: "Contact Created Successfully",
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

export const getContacts = async (req, res) => {
  try {
    const { username, userType } = req.body;

    console.log("inside getLeads-----", username, userType);
    let response = null;
    if (userType === "Manager") {
      response = await getManagerContacts(username);
    } else {
      response = await fetchContacts(username, userType);
    }
    console.log("getContact response  is---", response);
    res.status(200).send({
      message: "Contact fetched Successfully",
      success: true,
      contacts: response,
    });
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};
