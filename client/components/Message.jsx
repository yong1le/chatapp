import React from "react";

const Message = ({ message, sender }) => {
  let messageStyle = "flex flex-col my-2 ";
  let nameStyle = "text-xs text-gray-400 px-3 ";
  let contentStyle = "px-4 py-2 rounded-lg ";
  let timeStyle = "text-xs text-gray-400 px-1 ";

  if (sender === message.sender) {
    messageStyle += "self-end items-end";
    nameStyle += "";
    contentStyle += "bg-slate-100 ";
    timeStyle += "";
  } else {
    messageStyle += "self-start items-start ";
    nameStyle += "";
    contentStyle += "bg-black text-white ";
    timeStyle += "";
  }

  return (
    <div className={messageStyle}>
      <div className={nameStyle}>{message.sender}</div>
      <div className={contentStyle}>{message.contents}</div>
      <div className={timeStyle}>
        {new Date(message.createdAt).toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Message;
