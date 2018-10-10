const mongoose = require('mongoose');

const workOrderSchema = mongoose.Schema({
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
