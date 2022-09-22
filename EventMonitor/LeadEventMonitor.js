import { io, activeUsers } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function newLeadEmmiter(client, timeInMs = 60000, pipeline = []) {
  const collection = client.db("CRM").collection("leads");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    activeUsers.forEach((user) => {
      if (user.user.userType === "Admin") {
        io.to(user.socketId).emit("new lead", next);
      }
    });
  });
  await closeChangeStream(timeInMs, changeStream);
}
