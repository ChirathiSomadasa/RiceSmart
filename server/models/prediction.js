var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var predictShcema = new Schema(
    {
        variety:{type:String,required:true},
        estimatedYield:{type:String,required:true},
        yieldVariability:{type:String,required:true},
        geographicLocation:{type:String,required:true},
        historicalData:{type:String,required:true},
        irrigationPractices:{type:String,required:true},
        weatherConditions:{type:String,required:true},
        pestsDiseases:{type:String,required:true},
        
    }
);

var model = mongoose.model("prediction", predictShcema);
module.exports = model;