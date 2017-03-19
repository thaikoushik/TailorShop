var Category = require('../models/category');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/tailor');

var categories = [
    new Category({
        _id: '1',
        name: 'Shirts',
        imagePath: 'https://s-media-cache-ak0.pinimg.com/564x/0d/58/fb/0d58fb9b2e1f19faeb0a11081cd65274.jpg'
    }),
    new Category({
        _id: '2',
        name: 'Trousers',
        imagePath:'https://s-media-cache-ak0.pinimg.com/originals/13/65/cf/1365cff10ce26d639fb47e700e105f40.jpg'
    }),
    new Category({
        _id: '3',
       name: 'Suits',
        imagePath:'http://media.gq.com/photos/558434c009f0bee564435c9d/master/pass/style-2012-04-style-guide-suits-02-arthur.jpg'
    }),
    new Category({
        _id:'4',
       name: 'Blazers',
        imagePath:'http://stylesatlife.com/wp-content/uploads/2017/02/9-Pretty-Brown-Colour-Blazers-for-Men-Women.jpg'
    }),
    new Category({
        _id:'5',
       name: 'Tuxedos',
        imagePath: 'https://s-media-cache-ak0.pinimg.com/736x/b5/a8/4f/b5a84ffbe8eb525993bee1ab36992938.jpg'
    })
];

var done = 0;
for(var i=0;i<categories.length;i++){
    categories[i].save(function(err,result){
        done++;
        if(done === categories.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}