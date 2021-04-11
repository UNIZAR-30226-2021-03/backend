const router = require('express').Router()
const auth = require('../controllers/auth.controller.js');
const crypto = require('crypto');

router.get('/', (req,res) => {

    return res.send(
        {
            user: 'andoni',
            password: '1234',
            email: 'barabarians@gmail.com'
        }
    ).status(200)
})

router.post('/login', auth.LogIn);

router.post('/signup',auth.SingUp);

router.get('/verify/:token',auth.Verify);

router.post('/2fa',auth._2FA_Auth);


module.exports = router;