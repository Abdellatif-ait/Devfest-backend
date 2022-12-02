const router= require('express').Router();
const {handleGet,handleCreate,handleDelete,handleUpdate} =require('../Controllers/Notification')
//get All Notifiaction of one User
router.get('/:id',handleGet)
//Create Notification for User
router.post('/:id',handleCreate)
//Delete Notification for User
router.delete(':id',handleDelete)
//update Notification for User
router.put('/:id',handleUpdate)

module.exports= router;
