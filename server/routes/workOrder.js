const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/workOrders');
/* GET home page. */
router.post('/createorder',(req, res) =>{
    console.log('in: ',req.body);
    let data = req.body.data;
    let coffeeName = data.coffeeName;
    let brewMethod = data.brewMethod;
    let shipDate = data.shipDate;
    let numberOfCases = data.numberOfCases;
    let priority = data.priority;
    let packetsPerCase = data.packetsPerCase;
    let notes = data.notes;
    let orderId = '#'+Math.floor(1000 + Math.random() * 9000);
    console.log("#########################",shipDate);
    let newOrder = new WorkOrder({
        orderId: orderId,
        coffeeName: coffeeName,
        brewMethod: brewMethod,
        shipDate: shipDate,
        numberOfCases: numberOfCases,
        priority: priority,
        packetsPerCase: packetsPerCase,
        notes: notes
    });

    WorkOrder.createOrder(newOrder,(err,order)=>{
        if(err)
            console.log(err);
        else
            res.sendStatus(200);
    })
});


router.get('/getAllOrders',(req,res)=>{
    WorkOrder.find({}).sort([['shipDate', 1], ['priority', -1]]).exec((err,docs)=>{
        //console.log(docs);
        res.send(JSON.stringify(docs));
    });

});

module.exports = router;
