import React from "react";
import FriendCard from "./FriendCard";
import axios from "axios";

function FriendList({ friends,getFriends }) {
  console.log(friends);

  
  const deleteFunc = (id) => {
    axios
    .delete(`http://localhost:8000/users/${id}`)
    .then(res =>{
      getFriends();
    })
    .catch(err =>{
      console.log("cant delete friend");
    })
  }
  return (
    <div className="friends-container">
      {friends.map((friend,idx) => {
        return <FriendCard friend={friend} key={idx} deleteFunc = {deleteFunc} />;
      })}
    </div>
  );
}

export default FriendList;
