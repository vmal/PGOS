const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/workOrders');

/*
Creates an order by saving it in the database.
 */
router.post('/createorder',(req, res) =>{
    let data = req.body.data;
    let coffeeName = data.coffeeName;
    let brewMethod = data.brewMethod;
    let shipDate = data.shipDate;
    let numberOfCases = data.numberOfCases;
    let priority = data.priority;
    let packetsPerCase = data.packetsPerCase;
    let notes = data.notes;
    let orderId = '#'+Math.floor(1000 + Math.random() * 9000);
    console.log(coffeeName);
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
        {
            console.log(err);
            res.json({'ERROR': err});

        }
        else
        {
            res.json({'SUCCESS': order});
        }
    })
});

/*
Gets all the orders from the database by sorting them according to Shipping Date in ascending order and Priority.
 */
router.get('/getAllOrders',(req,res)=>{
    WorkOrder.find({}).sort([['shipDate', 1], ['priority', -1]]).exec((err,docs)=>{
        //console.log(docs);
        if(err)
        {
            console.log(err);
            res.sendStatus(500);
        }
        else
            res.status(200).json(docs);
    });

});

module.exports = router;
