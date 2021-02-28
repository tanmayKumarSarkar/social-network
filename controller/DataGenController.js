const generator = require ('../db/sql/datagen')


const genData = (req, res, next) => {
    try{
        const type = req.params.type;
        generator (type);
        if (type == 'all' || type == 'user' || type == 'post' || type == 'comment'){
            res.status(200).json({status:true, message: `Data Generation Started for ${type}`});
        }else {
            res.status(200).json({status:false, message: `Type '${type}' not Found`});
        }
    }catch (e) {
        console.log(e);
        res.status(500).json({status:false, message: 'Error!!', e});
    }
}
module.exports = {
    genData
}
