const mongoose = require('mongoose');
/*
A schema for storing the orders in the Database
 */
const workOrderSchema = mongoose.Schema({
    orderId: {
        type: String
    },
    coffeeName: {
        type: String
    },
    brewMethod: {
        type: String
    },
    shipDate: {
        type: String
    },
    numberOfCases: {
        type: Number
    },
    priority: {
        type: Boolean
    },
    packetsPerCase: {
        type: Number
    },
    notes: {
        type: String
    }
});

const workOrder = module.exports = mongoose.model('WorkOrder', workOrderSchema);

module.exports.createOrder = (newOrder, callback)=>{
    newOrder.save(callback);
};
