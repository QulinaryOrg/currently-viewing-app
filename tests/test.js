
var expect	= require('chai').expect;
var server	= require('../server.js');
var supertest	= require('supertest-as-promised');
var Promise	= require('promise');

var request	= supertest(server);
var ips		= Array.apply(null, {length: 10}).map(Function.call, Number)
    .map(function(i) { return '192.168.0.'+i; });

describe("API Tests", function() {
    describe("Test connecting", function() {
	before(function(done) {
	    Promise.all(
		ips.map(function(ip) {
		    return request.get('/api/ipaddress/add')
			.set('X-Forwarded-For', ip)
			.expect(200)
		})
	    ).then(function(results) {
		done();
	    }, done);
	});

	it("Should get list of IP addresses", function(done) {
	    request.get('/api/ipaddress/list')
		.set('Accept', 'application/json')
		.expect(function(res) {
		    expect(Object.keys(res.body)).to.have.length(ips.length);
		    ips.forEach(function(ip) {
			expect(res.body[ip]).to.equal(true);
		    });
		})
		.then(function(_) {
		    done();
		}, done);
	});
    });

    describe("Test disconnecting", function() {
	before(function(done) {
	    Promise.all(
		ips.map(function(ip) {
		    return request.get('/api/ipaddress/remove')
			.set('X-Forwarded-For', ip)
			.expect(200)
		})
	    ).then(function(results) {
		done();
	    }, done);
	});

	it("Should get list of IP addresses", function(done) {
	    request.get('/api/ipaddress/list')
		.set('Accept', 'application/json')
		.expect(function(res) {
		    expect(Object.keys(res.body)).to.have.length(0);
		    ips.forEach(function(ip) {
			expect(res.body[ip]).to.equal(undefined);
		    });
		})
		.then(function(_) {
		    done();
		}, done);
	});
    });
});
