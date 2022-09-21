import { insertServiceRequest } from "../models/ServiceModel.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { email, description, createdBy, priority } = req.body;
    const data = {
      email: email,
      description: description,
      createdBy: createdBy,
      priority: priority,
      createdOn: new Date(),
    };
    console.log("inside createServiceRequest--", data);
    const response = await insertServiceRequest(data);
    console.log("createServiceRequest response  is---", response);
    res.status(200).send({
      message: "Service Request Created Successfully",
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
