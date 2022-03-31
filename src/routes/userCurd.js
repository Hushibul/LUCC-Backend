
const { getUsers, addUser, getUserById, editUser, deleteUser ,editUserProfile} = require ("../controller/admin/userCurd");
const { event_getUsers, event_addUser, event_getUserById, event_editUser, event_deleteUser ,event_editUserProfile} = require ("../controller/user_event_Curd");

const router = require("express").Router();

router.get('/alluser', getUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/edit/:id', editUser);
router.delete('delete/:id', deleteUser);
router.put('/editprofile/:id', editUserProfile);

// -------------event route-----------
router.get('/eveent/user', event_getUsers);
router.post('/addevent', event_addUser);
router.get('/event/:id', event_getUserById);
router.put('/editevent/:id', event_editUser);
// router.delete('/:id', event_deleteUser);
router.put('/editprofileevent/:id', event_editUserProfile);

module.exports = router;