const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] })


router.post("/add/post", async (req, res) => {
    const { title, txtpost, postAs, course, concern, id, photo } = req.body

    if (req.isAuthenticated) {

        let anony = false;
        if (postAs === 'anonymous') {
            anony = true
        }


        const newPost = await prisma.post.create({
            data: {
                userId: id,
                title: title,
                txtpost: txtpost,
                anonymous: anony,
                course: course,
                concern: concern,
                photo: photo
            },
        });

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                posts: {
                    connect: {
                        id: newPost.id
                    }
                }
            },
            include: {
                posts: true
            }
        });

        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

router.get("/get/posts", async (req, res) => {
    if (req.isAuthenticated) {
        const getPosts = await prisma.post.findMany({
            include: {
                user: true,
            }
        })

        res.json(getPosts)
    }
})


module.exports = router
