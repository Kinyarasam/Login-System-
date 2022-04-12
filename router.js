var express = require('express')
var router = express.Router()

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// Login User
router.post('/login', (res, req) => {
    // console.log((res.body.email && res.body.password) == (credential.email && credential.password))
    if (res.body.email == credential.email && res.body.password == credential.password) {
        res.session.user = res.body.email
        req.redirect('/route/dashboard')
        req.end('Login Successful...')
    } else {
        console.log('Login UnSuccessful...')
        req.end("invalid Username or password")
    }
})
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', {user:req.session.user})
    } else {
        res.send("Unauthorized User")
    }
})

// Logging out
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.send('Error')
        } else {
            res.render('base', { title: "Express", logout: "Logout Successful" })
        }
    })
})

module.exports = router