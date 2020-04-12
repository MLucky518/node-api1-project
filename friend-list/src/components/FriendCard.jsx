import React from "react";
import faker from "faker";
import axios from "axios";

function FriendCard(props) {

  return (
    <div>
      <div className="ui raised link card">
        <div className="content">
          <div className="header">{props.friend.name}</div>
          <div className="meta">
            <span className="category">{props.friend.id}</span>
          </div>
          <div className="description">
            <p>{props.friend.bio}</p>
          </div>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <img className="ui avatar image" src={faker.image.avatar()} />{" "}
            {props.friend.name}
          </div>
        </div>
        <button className = "ui secondary button" onClick = {() => props.deleteFunc(props.friend.id)}>DELETE</button>
      </div>
    </div>
  );
}

export default FriendCard;
