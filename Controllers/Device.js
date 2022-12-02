const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient();
async function handleGet(req,res){
    try {
        const devices= await prisma.device.findMany({where:{
            userId:parseInt(req.params.id)
        }})
        res.status(200).json({status:200,message:"here's what we found",data:devices})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleCreate(req,res){
    try {
        const {imei,name,address}= req.body
        const userId= req.params.id
        const device= await prisma.device.create({data:{
            imei,address,name,userId:parseInt(userId)
        }})
        res.status(200).json({status:200,message:"Device created!!",data:device})
    } catch (error) {
        res.status(500).json({status:500,message:error.message})
    }
}
async function handleDelete(req,res){
    try {
        const id= req.params.id
        const device= await prisma.device.delete({where:{imei:id}})
        res.status(200).json({status:200,message:"Device deleted!!",data:device})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleUpdate(req,res){
    try {
        const {imei,name,address}= req.body
        const device= await prisma.device.update({where:{imei:imei}, data:{
            imei,address,name
        }})
        res.status(200).json({status:200,message:"Device updated!!",data:device})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}

module.exports={handleGet,handleCreate,handleDelete,handleUpdate}