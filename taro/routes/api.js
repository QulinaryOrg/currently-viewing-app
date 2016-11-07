var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');

//Used for routes that must be authenticated.
router.use('/posts', function(req, res, next) {

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (!req.isAuthenticated()){
        return res.send(403);
    }
    return next();
});

//api for all posts
router.route('/posts')

    //create a new post
    .post(function(req, res){

        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function(err, post) {
            if (err){
                return res.send(500, err);
            }
            return res.json(post);
        });
    })

    .get(function(req, res){
        Post.find(function(err, posts){
            if(err){
                return res.send(500, err);
            }
            return res.send(posts);
        });
    })


router.route('/posts/:id')
	
	//create
    .put(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);

            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post){
                if(err)
                    res.send(err);

                res.json(post);
            });
        });
    })

    .get(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);
            res.json(post);
        });
    })

    .delete(function(req, res){
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });

router.get('/auth', function(req, res){
    if(req.user){
       result = {
            "name": req.user.username,
            "anonymous": false
        } 
    }
    else{
        result = {"name":"", "anonymous":true}
    }
    res.json(result);
})

module.exports = router;
