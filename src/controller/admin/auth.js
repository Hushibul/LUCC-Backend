const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");


exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = "admin";
      if (count === 0) {
        role = "super-admin";
      }

      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (
        isPassword &&
        (user.role === "admin" || user.role === "super-admin")
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName
        ,depertment, student_id, batch,phone_number,pofilePicture,section } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName
          ,depertment, student_id, batch,phone_number,pofilePicture,section },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password or you are not admim",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};


//update User password
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.body.id);

  const isPasswordMatched = await user.authenticate(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res.status(400).json({
      message: "Id password is incorrect",
    });
        // next();
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
      message: "Password does not match",
    });
    
    // next();
  }
  const hash_newPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.hash_password = hash_newPassword;

  // await user.save();



  await user.save((error, data) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    if (data) {
      return res.status(201).json({
        message: "Password Update is Successfully..!",
      });
    }
  });
  
};


// Get User Detail
exports.getUserDetails = async (req, res, ) => {
  
  // const user = await User.findById(req.params.id);
  // await res.status(200).json(
  //   // success: true,
  //   user
  //   // token
  // );
  
  try{
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      user
    });
}catch( error ){
    res.status(404).json({ message: error.message })
}
};


// Get a user by id
exports.getUserById = async (request, response) => {
  try{
      const user = await User.findById(request.params.id);
      response.status(200).json(user);
  }catch( error ){
      response.status(404).json({ message: error.message })
  }
}