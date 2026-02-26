const mongoose =require('mongoose')
const Schema=mongoose.Schema
const QuestionExamSchema=new Schema({
            question:{
              type:String,
              required:true,
              trim:true
            },
            options:{type:[String],required:true,validate:{validator: function(value){
              value.length>=4
            },
            message:'Options must have 4 options'
          } },answer:{ 
              type:String,
              required:true,
              trim:true
            },
              prevExams:{
              type:[String],trim:true},
              explanation1:{type:String,trim:true},
              explanation2:{type:String,trim:true},
              hints:{type:String,trim:true},
  
              topic:{type:[String],required:true,trim:true}

},{timestamps:true})
const Jobs=mongoose.model('JobsData',QuestionExamSchema)
module.exports=Jobs