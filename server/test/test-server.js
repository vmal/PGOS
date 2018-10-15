const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

/*
Test Coverage checking the get request to get all orders from the database
 */
describe('Requests',()=>{
    it('should get all the orders',(done)=>{
        chai.request(server)
            .get('/workorder/getAllOrders')
            .end((err, res)=>{
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    /*
    Test Coverage to check if the server is saving the order in the expected format
     */
    it('should create an order',(done)=>{
        chai.request(server)
            .post('/workorder/createOrder')
            .send({
                "data":{
                    "coffeeName": "Three Africas",
                    "brewMethod": "Pour Over",
                    "shipDate": "2018-04-09T03:24:00",
                    "priority": "true",
                    "numberOfCases":10,
                    "packetsPerCase": 50,
                    "notes": "testing"
                }
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('coffeeName');
                res.body.SUCCESS.should.have.property('brewMethod');
                res.body.SUCCESS.should.have.property('shipDate');
                res.body.SUCCESS.should.have.property('priority');
                res.body.SUCCESS.should.have.property('numberOfCases');
                res.body.SUCCESS.should.have.property('packetsPerCase');
                res.body.SUCCESS.should.have.property('notes');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.coffeeName.should.equal('Three Africas');
                res.body.SUCCESS.brewMethod.should.equal('Pour Over');
                res.body.SUCCESS.shipDate.should.equal('2018-04-09T03:24:00');
                res.body.SUCCESS.priority.should.equal(true);
                res.body.SUCCESS.numberOfCases.should.equal(10);
                res.body.SUCCESS.packetsPerCase.should.equal(50);
                res.body.SUCCESS.notes.should.equal('testing');

                done();
            });
    })
});


