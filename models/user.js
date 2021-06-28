const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const userShema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  provider: String,
  displayName: String,
  email: String,
  picture: String,
});

userShema.plugin(passportLocalMongoose);
userShema.plugin(findOrCreate);

const userModel = mongoose.model("users", userShema);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(userModel.createStrategy());
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "903641916985-39urd7mdach0n6s6dhopr22dnm97ua3d.apps.googleusercontent.com",
//       clientSecret: "ELHSW49NzWWFMHBzACxyVi2I",
//       callbackURL: "http://localhost:8080/server/auth/google/home",
//       // passReqToCallback   : true
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       //   console.log(profile);
//       userModel.findOrCreate(
//         {
//           provider: profile.provider,
//           googleId: profile.id,
//           displayName: profile.displayName,
//           email: profile.email,
//           picture: profile.picture,
//         },
//         function (err, user) {
//           //   console.log(user);
//           //   userModel.update({ googleId: profile.id }, {});
//           return done(err, user);
//         }
//       );
//     }
//   )
// );

module.exports = {
  userShema: userShema,
  userModel: userModel,
};
