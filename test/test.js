process.env.NODE_ENV = 'test';

var chai    = require("chai");
var chaiHttp = require('chai-http');
var server = require("../taro/app").app;
var should = chai.should();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var utils = require('../taro/utils');

chai.use(chaiHttp);

describe("Posts api ", function() {
	User.collection.drop();
	Post.collection.drop();

	var newUser;

	beforeEach(function(done){
		newUser = new User({
			username: 'Waseem',
			password: utils.createHash('password')
		});
		newUser.save(function(err) {
			done();
		});
	});

	beforeEach(function(done){
		var newPost = new Post({
			text: 'Bat',
			created_by: 'some-id'
		});
		newPost.save(function(err) {
			done();
		});
	});

	afterEach(function(done){
		Post.collection.drop();
		done();
	});

	afterEach(function(done){
		User.collection.drop();
		done();
	});

	it('should list ALL posts on /api/posts GET', function(done) {
		chai.request(server)
			.get('/api/posts')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				done();
			});
	});

	it('should fail the authentication on NEW post on /api/posts POST', function(done) {
		chai.request(server)
			.post('/api/posts')
			.send({created_by: newUser._id, text: 'test'})
			.end(function(err, res){
				console.log(res.body)
				res.should.have.status(403);
				res.body.should.be.a('object');
				done();
			});
	});

});