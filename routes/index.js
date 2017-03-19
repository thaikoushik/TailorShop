var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');
var Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    
    Product.find(function(err,docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0;i<docs.length;i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));    
        }
        res.render('categories/index', { title: 'Tailor Design', productsList: productChunks, success: successMsg, noMessages: !successMsg });    
    });
    
});

router.get('/add-to-cart/:id', function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

router.get('/reduce/:id', function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart',function(req,res,next){
    if(!req.session.cart){
        return res.render('categories/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('categories/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout',isLoggedIn, function(req,res,next){
    if(!req.session.cart){
        //return res.render('categories/shopping-cart',{products:null});
        return res.redirect('/shoppingcart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('categories/checkout',{total:cart.totalPrice,errMsg,noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req,res,next){
    if(!req.session.cart){
        //return res.render('categories/shopping-cart',{products:null});
        return res.redirect('/shoppingcart');
    }
    var cart = new Cart(req.session.cart);
    var successMsg = req.flash('success')[0];
    var stripe = require("stripe")(
        "sk_test_CfZl2Qbwjzu7kFCv2IG7BcsW"
    );

    stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Test charges"
        }, function(err, charge) {
        if(err){
            req.flash('error',err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err,result){
            
            //req.flash('success','Successfully bought the product');
            req.session.cart = null;
            console.log(order);
            res.render('categories/order-confirmation',{order:order});
            //res.redirect('user/profile');    
        });
        
    });
});

router.get('/product-view/:id',function(req,res,next){
    var productId = req.params.id;
    Product.findById(productId, function(err,product){
        if(err){
            return res.redirect('/');
        }
        res.render('categories/product-view',{ product: product });
    });
   
});

router.get('/products-list/:id',function(req,res,next){
    var successMsg = req.flash('success')[0];
    var categoryId = req.params.id;
    Product.find({'categoryId': categoryId},function(err,docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0;i<docs.length;i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));    
        }
        res.render('categories/category-products', { title: 'Tailor Design', productsList: productChunks, success: successMsg, noMessages: !successMsg }); 
    });
});

router.get('/product-categories/',function(req,res,next){
    Category.find(function(err,docs){
        res.render('categories/categories-view',{categoryList:docs});      
    });   
});


module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldurl = req.url;
    
    res.redirect('/user/signin');
}

