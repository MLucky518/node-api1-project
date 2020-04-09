const express = require("express");
const db = require("./database.js");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());



server.get("/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users could not be retrieved ",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User does not exist",
    });
  }
});

server.post("/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      message: "Please provide a name AND a bio",
    });
  }
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      message: "There was an error saving the user",
    });
  }
});

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    }
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio,
    });

    if (!updatedUser) {
      res.status(500).json({
        errorMessage: "The user information could not be modified.",
      });
    }
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({
      message: "User does not exist",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    try {
      db.deleteUser(user.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({
        errorMessage: "couldnt delete user"
        
      });
    }
    
  } 
    res.status(404).json({
      message: "User does not exist",
    });
  
});

server.listen(8000, () => {
  console.log(`Server running on port 80001`);
});
