"use client";

import ChatBox from "@/components/ChatBox";
import MessageBox from "@/components/MessageBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const page = ({ params }) => {
  const sender = params.sender;
  const receiver = params.receiver;

  const router = useRouter();

  // Check that the friend exists
  useEffect(() => {
    if (sender === receiver) {
      router.push(`/${sender}`);
      return;
    }
    axios.get(`http://localhost:8000/users/find/${receiver}`).then((res) => {
      if (!res.data) {
        router.push(`/${sender}`);
        return;
      }
    });
  }, []);

  const WS_URL = `ws://localhost:8000/messages/${sender}/${receiver}`;
  const [messages, setMessages] = useState([]);

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    onMessage: (data) => {
      const message = JSON.parse(data.data);
      if (Array.isArray(message)) {
        setMessages([...messages, ...message]);
      } else {
        setMessages([...messages, message]);
      }
    },
  });

  const submitMessage = (e) => {
    e.preventDefault();

    sendJsonMessage({
      sender: sender,
      receiver: receiver,
      contents: e.target.contents.value,
    });

    e.target.contents.value = "";
  };

  // make sure chatbox is always scrolled to bottom
  const chatbox = useRef(null);
  useEffect(() => {
    chatbox.current.scrollTop = chatbox.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-full border-b-2 overflow-auto" ref={chatbox}>
        <ChatBox messages={messages} />
      </div>
      <div className="h-min flex py-2">
        <MessageBox submitMessage={submitMessage} />
      </div>
    </div>
  );
};

export default page;
