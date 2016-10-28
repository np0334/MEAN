// var router=require('express').Router();

// // router.all('/promotions', function(req,res,next) {
// //       res.writeHead(200, { 'Content-Type': 'text/plain' });
// //       next();
// // });
// router.get('/', function(req,res,next){
//         res.end('Get for Promotion');
// });
// router.post('/', function(req, res, next){
//      res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });
// router.delete('/', function(req, res, next){
//         res.end('Delete for promotions');
// });
// router.get('/:dishId', function(req,res,next){
//         res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
// });
// router.put('/:dishId', function(req, res, next){
//     res.write('Updating the dish: ' + req.params.dishId + '\n');
//     res.end('Will update the dish: ' + req.body.name + 
//             ' with details: ' + req.body.description);
// });
// router.delete('/:dishId', function(req, res, next){
//         res.end('Deleting dish: ' + req.params.dishId);
// });

// module.exports=router
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next)
     {
        Promotions.find({}, function (err, promotion) 
        {
            if(err) throw err;
            res.json(promotion);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) 
    {
        Promotions.create(req.body, function (err, promotion) 
        {
            if(err) throw err;
            console.log('Promotion created!');
            var id = promotion._id;
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) 
    {
        Promotions.remove({}, function (err, resp) 
        {
            if(err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) 
    {
        Promotions.findById(req.params.promoId, function (err, promotion) 
        {
            if(err) throw err;
            res.json(promotion);
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) 
    {
        Promotions.findByIdAndUpdate(req.params.promoId, 
        {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if(err) throw err;
            res.json(promotion);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {
            if(err) throw err;
            res.json(resp);
        });
    });

module.exports = promoRouter;