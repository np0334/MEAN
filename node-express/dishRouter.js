var router=require('express').Router();

router.all('/dishes', function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
});
router.get('/dishes', function(req,res,next){
        res.end('Will send all the dishes to you!');
});
router.post('/dishes', function(req, res, next){
     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete('/dishes', function(req, res, next){
        res.end('Deleting all dishes');
});
router.get('/dishes/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});
router.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});
router.delete('/dishes/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

module.exports=router