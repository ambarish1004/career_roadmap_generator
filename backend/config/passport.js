const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple").Strategy;
const User = require("../models/user");

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// ✅ Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = new User({ 
        name: profile.displayName, 
        email: profile.emails[0].value, 
        password: "OAuth", 
        isVerified: true 
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// ✅ Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/api/auth/facebook/callback",
  profileFields: ["id", "emails", "name"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = new User({
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        password: "OAuth",
        isVerified: true
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// ✅ Apple Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKeyPath: process.env.APPLE_PRIVATE_KEY_PATH,
  callbackURL: "http://localhost:5000/api/auth/apple/callback"
}, async (accessToken, refreshToken, idToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = new User({ name: profile.name || "Apple User", email: profile.email, password: "OAuth", isVerified: true });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
