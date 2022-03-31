const router = require("express").Router();

const { validateSignupRequest, isRequestValidated } = require('../validators/auth');
const {all_getBlood ,signup} = require ("../controller/blood");


router.post('/signup_blood',validateSignupRequest, isRequestValidated, signup);
router.get('/allblood/all',all_getBlood);

module.exports = router;