var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Dish = require('../models/dishes');
var Favourites = require('../models/favourites');

var favouritesRouter = express.Router();
favouritesRouter.use(bodyParser.json());

favouritesRouter.route('/')
.all(verify.verifyOrdinaryUser)
.get(function (req, res, next) 
{
     Favourites.find({'postedBy': req.decoded._doc._id})
    .populate('postedBy')
    .populate('dishes')
    .exec(function (err, favourite) 
    {
        if (err) throw err;
        res.json(favourite);
    });
})

.post(function (req, res, next) {
    Favourites.find({'postedBy': req.decoded._doc._id})
        .exec(function (err, favorite) 
        {
            if (err) throw err;
            req.body.postedBy = req.decoded._doc._id;
            
            if (favorites.length)
            {
                var favoriteAlreadyExist = false;
                if (favorites[0].dishes.length)
                {
                    for (var i = (favorites[0].dishes.length - 1); i >= 0; i--)
                    {
                        favoriteAlreadyExist = favorites[0].dishes[i] == req.body._id;
                        if (favoriteAlreadyExist) 
                            break;
                    }
                }
                if (!favoriteAlreadyExist)
                {
                    favorites[0].dishes.push(req.body._id);
                    favorites[0].save(function (err, favorite)
                    {
                        if (err) throw err;
                        console.log('Favourites array created!');
                        res.json(favorite);
                    });
                }
                else
                {
                    console.log('favourites added to array!');
                    res.json(favorites);
                }
            }
            else
            {
                Favorite.create({postedBy: req.body.postedBy}, function (err, favorite)
                {
                    if (err) throw err;
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite)
                    {
                        if (err) throw err;
                        console.log('Favourite created!');
                        res.json(favorite);
                    });
                })
            }
    });
})
.delete(function (req, res, next) {
    Favourites.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
    .all(verify.verifyOrdinaryUser)
    .delete(function (req, res, next) 
    {

        Favorite.find({'postedBy': req.decoded._doc._id}, function (err, favorite) 
        {
            if (err) return err;
            var favorite = favorites ? favorites[0] : null;

            if (favorite) 
            {
                for (var i = (favorite.dishes.length - 1); i >= 0; i--) 
                {
                    if (favorite.dishes[i] == req.params.dishId) 
                    {
                        favorite.dishes.remove(req.params.dishId);
                    }
                }
                favorite.save(function (err, favorite) 
                {
                    if (err) throw err;
                    console.log('Favourite deleted!');
                    res.json(favorite);
                });
            } 
            else 
            {
                console.log('Favourites not added!');
                res.json(favorite);
            }

        });
    });



module.exports = favouritesRouter;