var router=require('express').Router();

// router.all('/promotions', function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// });
router.get('/promotions', function(req,res,next){
        res.end('Get for Promotion');
});
router.post('/promotions', function(req, res, next){
     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete('/promotions', function(req, res, next){
        res.end('Delete for promotions');
});
router.get('/promotions/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});
router.put('/promotions/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});
router.delete('/promotions/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

module.exports=router