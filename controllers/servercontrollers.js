const passport = require("passport");
const user = require("../models/user");
const Chat = require("../models/chat");

const getRooms = (req, res) => {
  Chat.find((err, docs) => {
    res.send(docs);
  });
};

const getRoom = (req, res) => {
  console.log(
    "fdpofdsjfdospjfdopjfdopjdfsopfjsdposdfjopsfdjpofdsjsfdpojdfsopdjsfopfdjopfjfsdpo"
  );
  console.log(req.body);
  Chat.findOne({ _id: req.body.id }, (err, doc) => {

    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
};

const register = (req, res) => {
  user.userModel.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        res.json(err);
      } else {
        passport.authenticate("local", () => {});
        res.json({ name: "customMessage", message: "success" });
      }
    }
  );
};

const login = (req, res) => {
  const User = new user.userModel({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(User, function (error) {
    if (error) {
      res.json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.json({ name: "customMessage", message: "success" });
      });
    }
  });
};

const addRoom = (req, res) => {
  Chat.find({ roomname: req.body.roomname }, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      if (doc.length === 0) {
        const chatRoom = new Chat({
          roomname: req.body.roomname,
          chats: [],
        });

        chatRoom.save();
        res.json({ message: "success" });
      } else {
        res.json({ message: "room exists" });
      }
    }
  });
};

const checkIfAuthenticated = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "success" });
  } else {
    res.json({ message: "failure" });
  }
};

const logout = (req, res) => {
  req.logOut();
  res.json({ message: "success" });
};

module.exports = {
  getRooms: getRooms,
  getRoom: getRoom,
  register: register,
  login: login,
  addRoom: addRoom,
  checkIfAuthenticated: checkIfAuthenticated,
  logout: logout,
};
