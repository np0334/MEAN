var router = require('express').Router();

// router.all('/leadership',function(req,res,next) {
// 	res.writeHead(200, {'Content-Type' : 'text/plain'});
// 	next();
// });
router.get('/', function(req,res,next){
        res.end('Get request for leadership');
});
router.post('/', function(req, res, next){
     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete('/', function(req, res, next){
        res.end('Delete request for leadership');
});
router.get('/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});
router.put('/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});
router.delete('/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

module.exports=router