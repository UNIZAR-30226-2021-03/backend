const router = require('express').Router()

router.get('/', (req,res) => {
    return res.send(
        {
            user: 'andoni',
            password: '1234',
            email: 'barabarians@gmail.com'
        }
    ).status(200)
})

module.exports = router;