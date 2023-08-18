import express from "express";
import { addMessage, findMessages } from "../models/messages.js";
import { wssInstance } from "../setup.js";

const router = express.Router();

router.ws("/:sender/:receiver", async (ws, req) => {
  // On initial connection, send the data
  const sender = req.params.sender;
  const receiver = req.params.receiver;
  ws.values = {
    sender: sender,
    receiver: receiver
  }
  const messages = await findMessages(sender, receiver);
  ws.send(JSON.stringify(messages));

  // Everytime a new message is added, only send that one message
  ws.on("message", async (data) => {
    const json = JSON.parse(data);
    const sender = json.sender;
    const receiver = json.receiver;
    const contents = json.contents;

    const message = await addMessage(sender, receiver, contents);
    wssInstance.clients.forEach((e) => {
      if ((e.values.sender === sender && e.values.receiver === receiver) ||
        (e.values.sender === receiver && e.values.receiver === sender)) {
        e.send(JSON.stringify(message))
      }
    })
  });
});

export default router;
