import React, { useEffect, useState } from "react";
import "./App.css";
import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";
import axios from "axios";

function App() {
  const [friends, setFriends] = useState([]);

  const getFriends = () =>{
    axios
    .get("http://localhost:8000/users")
    .then((res) => {
      console.log(res);
      setFriends(res.data);
    })
    .catch((err) => {
      console.log("cannot retrieve data", err);
    });
  }

  useEffect(() => {
   getFriends();
  }, []);

  console.log(friends);

  return (
    <div className="App">
      <h1>FriendsList</h1>
      <AddFriend getFriends = {getFriends}/>
      <div className="wrapper">
        <FriendList getFriends = {getFriends} friends={friends} />
      </div>
    </div>
  );
}

export default App;
