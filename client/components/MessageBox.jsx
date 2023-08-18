import React from "react";

const MessageBox = ({ submitMessage }) => {
  return (
    <form
      onSubmit={submitMessage}
      className="w-full flex justify-center px-10 items-center"
    >
      <input
        type="text"
        name="contents"
        id="contents"
        className="border-2 border-black rounded-lg p-2 w-full"
        required
        placeholder="Message"
      />
      <input type="submit" className="hidden" />
    </form>
  );
};

export default MessageBox;
