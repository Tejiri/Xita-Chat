const express = require("express");
const router = express.Router();
const controllers = require("../controllers/servercontrollers");
const passport = require("passport");
const chat = require("../models/chat");
router.get("/getrooms", controllers.getRooms);

router.post("/getroom", controllers.getRoom);

router.post("/register", controllers.register);

router.post("/login", controllers.login);

router.post("/addchatroom", controllers.addRoom);

router.get("/checkuser", controllers.checkIfAuthenticated);

router.get("/logout", controllers.logout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/home",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/",
  }),
  (req, res) => {
    res.send("fdsfds");
  }
);

router.get("/user", (req, res) => {
  res.json({ user: req.user.username });
});

router.post("/addchat", (req, res) => {
  console.log(req.body);
  chat.findByIdAndUpdate(
    { _id: req.body.id },
    { $push: { chats: { user: req.body.user, message: req.body.chat } } },
    (err, docs) => {
      if (err) {
        res.send(err);
      } else {
        res.send(docs);
        // console.log(docs);
      }
    }
  );
});

module.exports = router;
