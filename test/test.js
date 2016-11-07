process.env.NODE_ENV = 'test';

var chai    = require("chai");
var chaiHttp = require('chai-http');
var server = require("../taro/app").app;
var should = chai.should();

chai.use(chaiHttp);

describe("API testing", function() {
	describe("Posts api ", function() {
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

	});
});