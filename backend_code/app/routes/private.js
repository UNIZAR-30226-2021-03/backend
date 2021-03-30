const router = require('express').Router()
const data = require('../controllers/data.controller.js');



router.post('/category',data.CreateCategory);

router.post('/info',data.CreateInfo);

router.delete('/info',data.DeleteInfo);

router.delete('/category',data.DeleteCategory);

router.get('/categories',data.GetCategories);

router.get('/infos',data.GetInfos);

module.exports = router;