const router= require('express').Router();
const {handleGet,handleCreate,handleDelete,handleUpdate}=require("../Controllers/Device")
//get All Devices of one User
router.get('/:id',handleGet)
//Create Device for User
router.post('/:id',handleCreate)
//Delete Device for User
router.delete(':id',handleDelete)
//update Device for User
router.put('/:id',handleUpdate)

module.exports= router;
