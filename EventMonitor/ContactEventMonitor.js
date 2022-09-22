import { io, activeUsers } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function newContactEmmiter(
  client,
  timeInMs = 60000,
  pipeline = []
) {
  const collection = client.db("CRM").collection("contacts");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    console.log("mongoevnt detected", next);
    console.log("mongoevnt activeUsers", activeUsers);
    activeUsers.forEach((user) => {
      if (user.user.userType === "Admin") {
        console.log("admin detected");
        io.to(user.socketId).emit("new contact", next);
      }
    });
  });
  await closeChangeStream(timeInMs, changeStream);
}
