const router = require('express').Router()
const category = require('../controllers/category.controller.js');
const info = require('../controllers/info.controller.js');

router.post('/category',category.CreateCategory);

router.post('/info',info.CreateInfo);

router.delete('/info',info.DeleteInfo);

router.delete('/category',category.DeleteCategory);

router.get('/categories',category.GetCategories);

router.get('/infos',info.GetInfos);

module.exports = router;