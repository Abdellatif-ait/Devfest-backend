const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient();

async function handleGet(req,res){
    try {
        const id = req.params.id
        const notifiactions = await prisma.notification.findMany({where:{
            userId:parseInt(id)
        }})
        console.log(notifiactions)
        res.status(200).json({status:200,message:"here's the result of your search",data:notifiactions})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleCreate(req,res){
    try {
        const id= req.params.id
        const {type,content}= req.body
        const notification= await prisma.notification.create({data:{
            type,content,userId:parseInt(id)
        }})
        res.status(200).json({status:200,message:"notification created",data:notification})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleDelete(req,res){
    try {
        const id= req.params.id
        const notification= await prisma.notification.delete({where:{
            id:parseInt(id)
        }})
        res.status(200).json({status:200,message:"notification deleted",data:notification})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleUpdate(req,res){
    try {
        const id= req.params.id
        const {type,content}= req.body
        const notification= await prisma.notification.update({where:{
            id:parseInt(id)
        },data:{
            type,content
        }})
        res.status(200).json({status:200,message:"notification updated",data:notification})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}

module.exports={handleGet,handleCreate,handleDelete,handleUpdate}