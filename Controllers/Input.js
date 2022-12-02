const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function handleGet(req, res) {
    try {
        const id = req.params.id
        const inputs = await prisma.input.findMany({
            where: {
                deviceEmei: id
            }
        })
        res.status(200).json({ status: 200, message: "Here's the result of your search", data: inputs })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong" })
    }
}
async function handleCreate(req, res) {
    try {
        const id = req.params.id
        const { temperature, pression, humidity, mouvement, light } = req.body;
        const input = await prisma.input.create({
            data: {
                humidity: parseFloat(humidity), temperature: parseFloat(temperature), pression: parseFloat(pression), light: parseFloat(light), mouvement: parseInt(mouvement), deviceEmei: id
            }
        })
        res.status(201).json({ status: 201, message: "input created!", data: input })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong", e: error.message })
    }
}
async function handleDelete(req, res) {
    try {
        const id = req.params.id
        const input = await prisma.input.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ status: 200, message: "input deleted!", data: input })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong" })
    }
}
async function handleUpdate(req, res) {
    try {
        const id = req.params.id;
        const { temperature, pression, humidity, mouvement, light } = req.body;
        const input = await prisma.input.update({
            where: {
                id: parseInt(id)
            }, data: {
                humidity, temperature, pression, light, mouvement
            }
        })
        res.status(200).json({ status: 200, message: "input updated!", data: input })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong" })
    }
}

module.exports = { handleGet, handleCreate, handleDelete, handleUpdate }