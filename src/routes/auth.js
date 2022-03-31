const express = require('express');
const { signup, signin } = require('../controller/auth');
const { signup_event,signin_event,getUserDetails } = require('../controller/event_auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);

// -------event-----auth route-----lucc

router.post('/signup_event',validateSignupRequest, isRequestValidated, signup_event);
router.post('/signin_event',validateSigninRequest, isRequestValidated, signin_event);
router.get('/loaduser_event/:id',getUserDetails);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;