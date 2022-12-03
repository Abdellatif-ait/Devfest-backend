const router= require('express').Router();
const { handleGet, handleCreate, handleDelete, handleUpdate }=require("../Controllers/Input")
//get All Inputs of a Device
router.get('/:id',handleGet)
//Create input of a device
router.post('/:id',handleCreate)
//Delete input of a Device
router.delete('/:id',handleDelete)
//update input
router.put('/:id',handleUpdate)

module.exports= router;
