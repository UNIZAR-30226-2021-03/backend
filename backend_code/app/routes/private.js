const router = require('express').Router()
const category = require('../controllers/category.controller.js');
const info = require('../controllers/info.controller.js');
const file = require('../controllers/file.controller.js');

router.post('/category',category.CreateCategory);

router.post('/info',info.CreateInfo);

router.delete('/info',info.DeleteInfo);

router.delete('/category',category.DeleteCategory);

router.get('/categories',category.GetCategories);

router.get('/infos',info.GetInfos);

router.get('/infobyurl',info.GetInfoByURL);

router.put('/info',info.UpdateInfo);

router.put('/category', category.UpdateCategory);

router.get('/file', file.DownloadFile);

router.delete('/file',file.DeleteFile);

router.post('/file',file.UploadFile);


module.exports = router;