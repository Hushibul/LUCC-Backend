
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {


    controller_name: {
      type: String,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      // required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    countdown: {
      type: String,
      trim: true,
    },
    schedule: {
      type: String,
      trim: true,
    },
    day1: {
      type: String,
      trim: true,
    },
    day2: {
      type: String,
      trim: true,
    },
    day3: {
      type: String,
      trim: true,
    },
    day4: {
      type: String,
      trim: true,
    },
    counter1: {
      type: String,
      trim: true,
    },
    counter2: {
      type: String,
      trim: true,
    },
    counter3: {
      type: String,
      trim: true,
    },
    counter4: {
      type: String,
      trim: true,
    },
    select_event_name: {
      type: String,
      trim: true,
    },

    executive_member: {
      type: String,
      trim: true,
    },
    advisor: {
      type: String,
      trim: true,
    },
    founder: {
      type: String,
      trim: true,
    },
    reg_status: {
      type: String,
      enum: ['un-register', 'registerd', 'pending'],
      default: "un-register",
      trim: true,
    },



    role: {
      type: String,
      enum: ["user", "admin", "super-admin", "sponsor"],
      default: "user",
    },
    phone_number: { type: String },
    sponsor_name: { type: String, trim: true, },
    sponsor_logo: { type: String, trim: true, },

  },
  { timestamps: true }
);


userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
// decode
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("website_controller", userSchema);
