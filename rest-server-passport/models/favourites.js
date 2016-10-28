var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var dishidSchema = new Schema({
//     id:  {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Dish' 
//     }
// });
var favouriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});



// the schema is useless so far
// we need to create a model using it
var Favourites = mongoose.model('Favourite', favouriteSchema);

// make this available to our Node applications
module.exports = Favourites;