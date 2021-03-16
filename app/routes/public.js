const router = require('express').Router()

router.get('/', (req,res) => {
    console.log(req)
    return res.send('ok').status(200)
})

module.exports = router;