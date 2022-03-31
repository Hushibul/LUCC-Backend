const User = require("../models/blood");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password,address,blood_group,phone_number ,age} = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      address,
      blood_group,
      age,
      phone_number,
      username: shortid.generate(),
      
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message:error+ "Something went wrong",
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role, user.activation_status);
        const { _id, firstName, lastName, email, role, activation_status, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, activation_status, fullName },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
    //   if (isPassword && user.role === "user" && user.activation_status=="active" ||user.role === "admin" ||user.role === "super-admin"  ) 
      if (isPassword) {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
		  success:true,
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
		  success:false,
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};





// blood curd operation function


// Get all users
exports.all_getBlood = async (request, response) => {
    // console.log('event_getUsers')
    try{
        const users = await User.find()
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message ,rimel:'rimel'})
        // console.log(error )
    }
}

// Save data of the user in database
exports.event_addUser = async (request, response) => {
    // retreive the info of user from frontend
    const user = request.body;
    console.log("inside")

    const newUser = new User(user);
    try{
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// Get a user by id
exports.event_getUserById = async (request, response) => {
    
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}



exports.event_editUserProfile = async (req ,res) =>{
    

    ////// here filte the Transaction id uniquely
    const transactionID =await User.findOne({transactionid:req.body.transactionid}).then(user=>{
        if(user){  
            return true
        }else{
            return false;
        }
    })
    
             
    await User.findById(req.params.id)
      .then(User => {
        
       
        
        if(transactionID){
            // console.log(transactionID,'true')
            'sorry transactionid already used'
        }else{
            User.transactionid = req.body.transactionid;
            // console.log('false')
           
        }
       
        
        User.student_id = req.body.student_id;
        User.section = req.body.section;
        User.phone_number = req.body.phone_number;
        User.reg_status= req.body.reg_status;
        User.institute_name = req.body.institute_name;
        User.T_Shirt_Size = req.body.T_Shirt_Size;
        User.contest_name = req.body.contest_name;
        User.payment_number = req.body.payment_number;
        
        // ---------------member 2-------
        User.member2_name= req.body.member2_name;
        User.institute_name2=  req.body.institute_name2;
        User.T_Shirt_Size2=  req.body.T_Shirt_Size2;
        User.phone_number2=  req.body.phone_number2;
        User.student_id2= req.body.student_id2;

        // ---------------member 2-------
        User.member3_name= req.body.member3_name;
        User.institute_name3=  req.body.institute_name3;
        User.T_Shirt_Size3=  req.body.T_Shirt_Size3;
        User.phone_number3=  req.body.phone_number3;
        User.student_id3= req.body.student_id3;
        // ---------------member 2-------
        User.member4_name= req.body.member4_name;
        User.institute_name4=  req.body.institute_name4;
        User.T_Shirt_Size4=  req.body.T_Shirt_Size4;
        User.phone_number4=  req.body.phone_number4;
        User.student_id4= req.body.student_id4;
  
        // User.pofilePicture = req.body.pofilePicture;
        
  
        User.save()
          .then(() => res.json(
          { message:'Profile is updated!',
            success: true,
          }))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

exports.event_editUser = async (req ,res) =>{
    await User.findById(req.params.id)
      .then(User => {
        // if(req.body.activation_status==length(0)){
        //     User.activation_status = req.body.activation_status;
        // }
        User.activation_status = req.body.activation_status;
        User.role = req.body.role;
        
  
        User.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

// deleting data of user from the database
exports.event_deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}