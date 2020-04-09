import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const AddFriend = (props) => {
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });

  const handleChanges = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitFriend = (e) => {
    e.preventDefault();
      axios
      .post("http://localhost:8000/users",user)
      .then(res =>{
          props.getFriends();
      })
      .catch(err =>{
          console.log("cant add user")
      })
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}ADD
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add a new Friend</ModalHeader>
        <div className="ui form">
          <form onSubmit = {submitFriend}>
            <div className="field">
              <label>First Name: </label>
              <input type="text" name="name" placeholder="First Name" onChange = {handleChanges} value = {user.name} />
            </div>
            <div class="field">
              <label>Bio: </label>
              <textarea type="text" name="bio" onChange = {handleChanges} value = {user.bio}/>
            </div>
            <button type="submit">SUBMIT</button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddFriend;
