"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Friend from "./Friend";

const FriendsPanel = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/users/list/${user}`).then((res) => {
      if (!res.data) {
        setFriends([]);
      } else {
        setFriends(res.data);
      }
    });
  }, []);

  return (
    <div className="h-full max-h-full overflow-auto">
      {friends.map((friend, i) => (
        <Friend friend={friend.username} key={i}/>
      ))}
    </div>
  );
};

export default FriendsPanel;
