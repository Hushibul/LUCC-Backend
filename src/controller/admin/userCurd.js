
const User = require("../../models/user");

// Get all users
exports.getUsers = async (request, response) => {
    // Step -1 // Test API
    // response.send('Code for Interview');
    try{
        // finding something inside a model is time taking, so we need to add await
        const users = await User.find();
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the user in database
exports.addUser = async (request, response) => {
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
exports.getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

exports.editUserProfile = async (req ,res) =>{
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
       
        User.reg_status= req.body.reg_status;
        User. student_id = req.body. student_id;
        User.depertment = req.body.depertment;
        User.batch = req.body.batch;
        User.section = req.body.section;
        User.phone_number = req.body.phone_number;
        User.pofilePicture = req.body.pofilePicture;
        User.payment_number = req.body.payment_number;

        // --------------------event-----------
        User.institute_name = req.body.institute_name;
        User.T_Shirt_Size = req.body.T_Shirt_Size;
        User.contest_name = req.body.contest_name;


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
  

        
  
        User.save()
          .then(() => res.json(
          { message:'Profile is updated!',
            success: true,
          }))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

exports.editUser = async (req ,res) =>{
    await User.findById(req.params.id)
      .then(User => {
        // if(req.body.activation_status==length(0)){
        //     User.activation_status = req.body.activation_status;
        // }
        User.activation_status = req.body.activation_status;
        User.role = req.body.role;
        User.position = req.body.position;
        
        
  
        User.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

// deleting data of user from the database
exports.deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}