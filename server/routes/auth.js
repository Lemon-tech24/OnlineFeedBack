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
            })

        } catch (err) {
            console.log(err)
        }

    } else {
        res.json({ success: false, message: 'Not authenticated' });

    }
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:5173/login')
})

router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }))



router.get('/google/callback', passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "/login/failed"
}))


module.exports = router