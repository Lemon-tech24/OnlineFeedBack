const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] })

router.post("/post", async (req, res) => {

})


module.exports = router
