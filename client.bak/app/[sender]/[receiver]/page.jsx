"use client";

import React, { useState } from "react";

const s = new WebSocket("ws://localhost:8000/messages/");

export default function page({ params }) {
  const [messages, setMessages] = useState([]);

  const queryMessages = (json) => {
    const data = json.filter(entry => {
      return (
        entry.sender == params.sender && entry.receiver == params.receiver
        ||
        entry.receiver == params.sender && entry.sender == params.receiver
      );
    })
    console.log(data);
    setMessages(data);
  }

  s.onmessage = (data) => {
    const json = JSON.parse(data.data);
    queryMessages(json)
  }

  const clearMessage = (e) => {
    e.target.contents.value = "";
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const data = {
      sender: params.sender,
      receiver: params.receiver,
      contents: e.target.contents.value,
    };
    s.send(JSON.stringify(data));
    clearMessage(e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={submitMessage}>
        <textarea type="text" name="contents" />
        <input type="submit" value="submit" />
      </form>
      <div>
        {
          messages.map(entry => (
            <div>
              From: {entry.sender} <br/>
              To: {entry.receiver} <br/>
              Contents: {entry.contents} <br/>
            </div>
          ))}
      </div>
    </div>
  );
}
