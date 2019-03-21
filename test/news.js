const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const server = require('../server.js');

describe('GET all news', () => {
    it('should return all news', (done) => {
        chai.request(server)
            .get('/api/getNews')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a
                // the first object in the data array should
                // have the right keys
                res.body[0].should.include.keys(['text', 'userId', 'date', 'theme']);
                done();
            });
    });
});