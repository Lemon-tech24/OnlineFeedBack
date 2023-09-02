const router = require('express').Router()
const passport = require('passport')

router.get('/login/failed',(req,res)=>{
    res.redirect('/login')
})

router.get('/login/success', (req,res)=>{
    if (req.isAuthenticated() && req.user) {
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: req.user.displayName,
            email: req.user.emails[0].value,
            id: req.user.id,
        })
      } else {
        res.json({ success: false, message: 'Not authenticated' });

      }
})


router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/login/failed')
})

router.get('/google', passport.authenticate('google', {scope: ['openid','profile', 'email']}))

router.get('/google/callback', passport.authenticate("google", {
    successRedirect:"http://localhost:5173/home",
    failureRedirect:"/login/failed"
}))


module.exports = router