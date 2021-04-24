const Data = require('../models/data')
const mongoose = require('mongoose')
const {fileUploadValidation,fileDownloadValidation,fileDeleteValidation} = require('../helpers/validation.helper');

const DownloadFile = async(req,res) => {
    if(!fileDownloadValidation(req.query)){
        return res.status(400).send({});
    }
    try{
        const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
        const file = await gridFSBucket.find({_id: mongoose.Types.ObjectId(req.query.file_id) }).toArray()
		
        if (!file.length) {
            return res.status(400).send({})
		}
        res.setHeader('Content-Disposition', 'attachment; filename="' + file[0].filename + '"')
        
        gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(req.query.file_id)).
        pipe(res).
        on('error', (error) => {
            return res.status(400).end();
        }).
        on('finish', () => {
            return res.status(200).end()
        });
        
    }catch(err){
        return res.status(500).send(err);
    } 
}
//Para update: primero delete y luego upload

const UploadFile = async(req,res) => {
   
    if(!fileUploadValidation(req.query,req.busboy)){
        return res.status(400).send({});
    }
    
    try{
        const user_id = req.token._id;
        const {info_id,category_id} = req.query;
        const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});

        req.pipe(req.busboy).
        on('file',  (fieldname, file, filename) => {
		    file.pipe(gridFSBucket.openUploadStream(filename)).
		    on('error', (error) => {
                return res.status(500).send({})
	  	    }).
	  	    on('finish', async (data) => {
			    const update = {
                    name: filename,
                    file_id: mongoose.Types.ObjectId(data._id)
                }
                
                const resultado = await Data.updateOne(
                    {
                        _id : mongoose.Types.ObjectId(user_id)
                    },
                    { 
                        $set: {"category.$[i].info.$[j].file": update}
                    },
                    {
                        arrayFilters: [
                            {"i._id": mongoose.Types.ObjectId(category_id)},
                            {"j._id": mongoose.Types.ObjectId(info_id) }
                        ]
                    }
                );
                if (resultado.nModified >= 1){
                    return res.status(200).send({})
                }
                return res.status(400).send({})
	    	});
        }); 
    }catch(err){
        return res.status(500).send(err)
    }
}

const DeleteFile = async (req,res) => {

    if(!fileDeleteValidation(req.query)){
        return res.status(400).send({});
    }
    try{
        
        const user_id = req.token._id;
        const {info_id,category_id,file_id} = req.query;
        const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
        
        try{
            gridFSBucket.delete( mongoose.Types.ObjectId(file_id))
        }catch(err){
            return res.status(400).send(err)
        }
        
        const resultado = await Data.updateOne(
            {
                _id : mongoose.Types.ObjectId(user_id)
            },
            { 
                $unset: {"category.$[i].info.$[j].file": ""}
            },
            {
                arrayFilters: [
                    {"i._id": mongoose.Types.ObjectId(category_id)},
                    {"j._id": mongoose.Types.ObjectId(info_id) }
                ]
            }
        );
        if (resultado.nModified >= 1){
            return res.status(200).send({})
        }
        return res.status(400).send({})
    }catch(err){
        return res.status(500).send(err)
    }
}


module.exports = {DownloadFile,DeleteFile,UploadFile}