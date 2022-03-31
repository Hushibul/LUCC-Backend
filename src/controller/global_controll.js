
const User = require("../models/global_controller");

const shortid = require("shortid");

// Get all users
exports.global_getUsers = async (request, response) => {
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
exports.global_addUser = async (request, response) => {
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

// Save data of the user in database
exports.global_addSponsor = async (request, response) => {
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
exports.global_getUserById = async (request, response) => {
    
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}


exports.global_editUserProfile = async (req ,res) =>{
    

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
       
        
        User. student_id = req.body. student_id;
        User.section = req.body.section;
        User.controller_name = req.body.controller_name;
        User.countdown = req.body.countdown;
        User.schedule = req.body.schedule;
        User.day1 = req.body.day1;
        User.day2 = req.body.day2;
        User.day3 = req.body.day3;
        User.day4 = req.body.day4;
        User.counter1= req.body.counter1;
        User.counter2= req.body.counter2;
        User.counter3= req.body.counter3;
        User.counter4= req.body.counter4;
        User.select_event_name= req.body.select_event_name;

      
        
        
     
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

exports.global_editUser = async (req ,res) =>{
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
exports.global_deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}