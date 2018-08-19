let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaihttp);

describe('Visitors api Methods testing', () => {

    describe('/visitors POST Method response', () => {
        it('It will create/ add visitor information to database & return result', (done) => {
            let visitor = {
                ip: '192.208.45.67'
            };

            chai.request(server)
                .post('/visitors')
                .send(visitor)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ip');
                    res.body.should.have.property('lastlogin');
                    res.body.should.have.property('createdDate');
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    describe('/visitors Get Method response', () => {
        it('It should receive a get request and return response as array of objects', (done) => {
            chai.request(server)
                .get('/visitors')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.not.have.property('Message');
                    res.body.should.be.a('array');
                    done();
                });
        });


        it('It should receive a `time` parameter with  get request', (done) => {
            chai.request(server)
                .get('/visitors')
                .query({time:2000})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.not.have.property('Message');
                    res.body.should.be.a('array');
                    done();
                });
        });

    });


    describe('/visitors Delete Method response', () => {
        beforeEach((done)=>{

            let visitor = {
                ip: '192.208.45.67'
            };


            chai.request(server)
                .post('/visitors')
                .send(visitor)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ip');
                    res.body.should.have.property('lastlogin');
                    res.body.should.have.property('createdDate');
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('It will remove visitor information from database & return result', (done) => {

            let visitor = {
                ip: '192.208.45.67'
            };

            chai.request(server)
                .delete(`/visitors/${visitor.ip}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ip');
                    res.body.should.have.property('lastlogin');
                    res.body.should.have.property('createdDate');
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('It should return empty response if ip is not found to delete', (done) => {

            let visitor = {
                ip: '192.208.45.17'
            };

            chai.request(server)
                .delete(`/visitors/${visitor.ip}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.be.empty;
                    done();
                });
        });
    });
});