const express = require('express');
const { signup, signin, signout,updatePassword ,getUserDetails} = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignin,isAuthenticatedUser } = require('../../common-middleware/index');
const router = express.Router();


router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.put('/admin/updatepassword',  updatePassword);
router.get('/admin/loaduser/:id',getUserDetails);
router.post('/admin/signout', signout);


module.exports = router;