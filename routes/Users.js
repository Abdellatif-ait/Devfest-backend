const router = require('express').Router();
const { handleGetAll, handleGetSingle, handleLogin, handleRegister, handleDelete, handleUpdate } = require('../Controllers/User')
// get All Users
router.get('/', handleGetAll);
// get Single User
router.get('/:id', handleGetSingle);
// Login
router.post('/login', handleLogin);
// Register
router.post('/register', handleRegister);
//delete User
router.delete('/:id', handleDelete)
//update User
router.put('/:id', handleUpdate)

module.exports = router;