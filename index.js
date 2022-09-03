const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
let users = require("./data.json");
// GET ALL USER
app.get("/user/all", (req, res) => {
  const { limit } = req.query;
  const result = users.slice(0, limit);
  res.send(result);
});
// GET RANDOM USER
app.get("/user/random", (req, res) => {
  const randomUser = Math.floor(Math.random() * users.length);
  const result = users[randomUser];
  res.send(result);
});
app.post("/user/save", (req, res) => {
  const user = req.body;
  const updateUser = {
    _id: uuidv4(),
    ...user,
  };
  users.push(updateUser);
  res.send(users);
});

// UPDATE USER
app.patch("/user/update/:id", (req, res) => {
  const { id } = req.params;
  const currentUser = req.body;
  const findUser = users.find((user) => user?._id === Number(id));

  if (findUser) {
    findUser.gender = currentUser.gender;
    findUser.name = currentUser.name;
    findUser.contact = currentUser.contact;
    findUser.address = currentUser.address;
    findUser.photoUrl = currentUser.photoUrl;
  } else {
    return res.send("User not found. Please give a valid id");
  }
  res.send(findUser);
});
// DELETE A USER
app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user._id !== Number(id));
  res.send(users);
});
app.get("/", (req, res) => res.send("This Is Working"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
