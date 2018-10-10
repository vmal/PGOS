const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/workOrders');
/* GET home page. */
router.post('/createorder',(req, res) =>{
    console.log('in');
    let coffeeName = req.body.coffeeName;
    let brewMethod = req.body.brewMethod;
    let shipDate = req.body.shipDate;
    let numberofCases = req.body.numberOfCases;
    let priority = req.body.priority;
    let packetsPerCase = req.body.packetsPerCase;
    let notes = req.body.notes;
    console.log(shipDate);
    let newOrder = new WorkOrder({
        coffeeName: coffeeName,
        brewMethod: brewMethod,
        shipDate: shipDate,
        numberofCases: numberofCases,
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
    WorkOrder.find({}).sort({shipDate: 1, priorty: 1}).exec((err,docs)=>{
        console.log(docs);
        res.send(JSON.stringify(docs));
    });

});

module.exports = router;
