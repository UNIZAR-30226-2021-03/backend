const router = require('express').Router()
const data = require('../controllers/data.controller.js');



router.post('/category',data.CreateCategory);

router.post('/info',data.CreateInfo);

router.get('/categories',data.GetCategories);

router.get('/infos',data.GetInfos);

module.exports = router;