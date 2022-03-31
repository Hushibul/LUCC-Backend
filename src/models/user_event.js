
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {


    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    student_id: {
      type: String,
       trim: true,
    },
    transactionid: {
      type: String,
      trim: true,
      unique: true,


    },
    institute_name: {
      type: String,
      trim: true,
    },
    contest_name: {
      type: String,
      enum: ["programming_contest", "dx_ball_contest", "hackathon_contest", 'fifa_contest', 'nfs_contest', 'pubge_contest'],
      // default: "select_contest",
      trim: true,

    },
    reg_status: {
      type: String,
      enum: ['un-register', 'registerd', 'pending'],
      default: "un-register",
      trim: true,

    },
    hash_password: {
      type: String,
      required: true,
    },
    T_Shirt_Size: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
    
    payment_number: { type: String },
    phone_number: { type: String },
    reg_status: {
      type: String,
      enum: ['un-register', 'registerd', 'pending'],
      default: "un-register",
    },


    // ---------------member 2-------
    member2_name: { type: String },
    institute_name2: { type: String, trim: true, },
    T_Shirt_Size2: { type: String, trim: true, },
    phone_number2: { type: String },
    student_id2: { type: String, trim: true, },

    // ---------------member 3-------
    member3_name: { type: String },
    institute_name3: { type: String, trim: true, },
    T_Shirt_Size3: { type: String, trim: true, },
    phone_number3: { type: String },
    student_id3: { type: String, trim: true, },

    // ---------------member 4-------
    member4_name: { type: String },
    institute_name4: { type: String, trim: true, },
    T_Shirt_Size4: { type: String, trim: true, },
    phone_number4: { type: String },
    student_id4: { type: String, trim: true, },


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

module.exports = mongoose.model("User_event", userSchema);
