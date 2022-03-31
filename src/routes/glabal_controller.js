const { global_getUsers, global_addUser, global_getUserById, global_editUser, global_deleteUser ,global_editUserProfile,global_addSponsor} = require ("../controller/global_controll");

const router = require("express").Router();

router.get('/alluser/global', global_getUsers);
router.post('/add/global', global_addUser);
router.get('/global/:id', global_getUserById);
router.put('/edit/global/:id', global_editUser);
router.delete('/delete/:id', global_deleteUser);
router.put('/editprofile/global/:id', global_editUserProfile);
router.post('/addsponsor', global_addSponsor);

module.exports = router;