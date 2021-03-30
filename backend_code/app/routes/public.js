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

router.get('/:token',auth.Verify);

// router.get('/login',)
// 
// router.get('/login',)

module.exports = router;