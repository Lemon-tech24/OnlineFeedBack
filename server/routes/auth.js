const router = require('express').Router()
const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({ log: ['query', 'info', 'error'] })





router.get('/login/success', async (req, res) => {

    if (req.isAuthenticated() && req.user) {
        try {

            const existing = await prisma.user.findUnique({
                where: {
                    id: req.user.id,
                }
            })


            if (!existing) {
                const newUser = await prisma.user.create({
                    data: {
                        id: req.user.id,
                        name: req.user.displayName,
                        email: req.user.emails[0].value,

                    }
                })
            }

            await res.status(200).json({
                success: true,
                message: "Login Successfully",
                user: req.user.displayName,
                email: req.user.emails[0].value,
                id: req.user.id,
                given: req.user.name.givenName,
                family: req.user.name.familyName
            })

        } catch (err) {
            console.log(err)
        }

    } else {
        res.json({ success: false, message: 'Not authenticated' });

    }
})

router.post('/logout', (req, res) => {
    req.logout();
    res.send()
})


router.post('/login/failed', (req, res) => {
    res.json({ message: 'Login Failed Please Try Again' })
})

const delayedMiddleware = (req, res, next) => {
    setTimeout(() => {
        next()
    }, 500)
}

router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }))


router.get('/google/callback', delayedMiddleware, passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "/login/failed"
}))


module.exports = router