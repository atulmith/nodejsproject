const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const DynamicTable = require('../models/dynamictable.model');
var fs = require('fs');
var util=require('util');




module.exports = {
  
  dynamicinsert,
  dynamicdrp,
  testrelationship,
  filestreamfs,
  selectgeneric,
  selectgenericquery,
  selectdrpgeneric,
  selectsubdrpgeneric,
  selecteditgeneric,
  selecteditgeneric2,
  updategeneric,
  insertgeneric,
  selectgenericquerydynamictbl,
  selectautocompletegeneric
}

async function selectgeneric(req,res){
  console.log('selectgeneric');
  console.log(req.body.maintable);
  console.log(JSON.parse(req.body.subtables));
  console.log(JSON.parse(req.body.subtablesflds));

  var fields = JSON.parse(req.body.subtablesflds);
  var subtables= JSON.parse(req.body.subtables);
  const subtablesreq=[];
  var index=0;
  subtables.forEach(element=>{
     console.log(element);
    subtablesreq[index]=require('../models/'+ element +'.model');
    index=index+1;
  });

  const maintable=require('../models/'+ req.body.maintable +'.model');
 
  var posts;
  // console.log('subtables:',subtables);
  try{
    // console.log(1);
    if(subtables.length==0){
      
      posts = await maintable.find({})
                .exec();
    }
    if(subtables.length==1){
      
      posts = await maintable.find({})
                .populate(fields[0]).exec();
    }
    if(subtables.length==2){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==3){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[2]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==4){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==5){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==6){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])                
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .populate(fields[5])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    
    var p=new maintable();
    console.log('posts',posts);
    p=posts;
    var resultreturn=[];
    p.forEach(element => {
      // console.log('element', element);
      var resultx1= gridsinglelevel(element);
      resultreturn.push(resultx1); //not to use it
      });
      console.log('resultreturn: ', resultreturn);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(resultreturn);
  }catch(err){
    console.log('selecteditgeneric: ', err);
    res.json({err});
  }

  // maintable.find({}).populate('countryid').exec((err,posts)=>{
  //   if(err){
  //     console.log(err);
  //     res.json({err});
  //   }else{
  //     console.log(posts);
  //     // var resultx1= gridsinglelevel(posts);

  //     p=posts;
  //     var resultreturn=[];
  //     p.forEach(element => {
  //     // console.log('element', element);
  //     var resultx1= gridsinglelevel(element);
  //     resultreturn.push(resultx1)
  //     });
  //     console.log('resultreturn: ', resultreturn);
  //     res.json(resultreturn);
  //   }
  // });

}

async function selectgenericquery(req,res){
  console.log('selectgeneric');
  console.log(req.body.maintable);
  console.log(JSON.parse(req.body.subtables));
  console.log(JSON.parse(req.body.subtablesflds));
  console.log(JSON.parse(req.body.query));

  var fields = JSON.parse(req.body.subtablesflds);
  var subtables= JSON.parse(req.body.subtables);
  var query = JSON.parse(req.body.query);
  const subtablesreq=[];
  var index=0;
  subtables.forEach(element=>{
    // console.log(element);
    subtablesreq[index]=require('../models/'+ element +'.model');
    index=index+1;
  });

  const maintable=require('../models/'+ req.body.maintable +'.model');
 
  var posts;
  // console.log('subtables:',subtables);
  try{
    // console.log(1);
    if(subtables.length==0){
      posts = await maintable.find(query).exec();
    }
    if(subtables.length==1){
      
      posts = await maintable.find(query)
                .populate(fields[0]).exec();
    }
    if(subtables.length==2){
      posts = await maintable.find(query)
                .populate(fields[0])
                .populate(fields[1]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==3){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[2]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==4){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==5){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==6){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])                
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .populate(fields[5])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    
    var p=new maintable();
    console.log('posts',posts);
    p=posts;
    var resultreturn=[];
    p.forEach(element => {
      // console.log('element', element);
      var resultx1= gridsinglelevel(element);
      resultreturn.push(resultx1); //not to use it
      });
      console.log('resultreturn: ', resultreturn);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(resultreturn);
  }catch(err){
    console.log('selecteditgeneric: ', err);
    res.json({err});
  }

}

async function selectgenericquerydynamictbl(req,res){
  console.log('selectgeneric');
  console.log(req.body.maintable);
  console.log(JSON.parse(req.body.subtables));
  console.log(JSON.parse(req.body.subtablesflds));
  console.log(JSON.parse(req.body.query));

  var fields = JSON.parse(req.body.subtablesflds);
  var subtables= JSON.parse(req.body.subtables);
  var query = JSON.parse(req.body.query);
  const subtablesreq=[];
  var index=0;
  subtables.forEach(element=>{
    // console.log(element);
    subtablesreq[index]=require('../models/'+ element +'.model');
    index=index+1;
  });

  const maintable=require('../models/'+ req.body.maintable +'.model');
 
  var posts;
  // console.log('subtables:',subtables);
  try{
    // console.log(1);
    if(subtables.length==0){
      posts = await maintable.find(query).exec();
    }
    if(subtables.length==1){
      
      posts = await maintable.find(query)
                .populate(fields[0]).exec();
    }
    if(subtables.length==2){
      posts = await maintable.find(query)
                .populate(fields[0])
                .populate(fields[1]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==3){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[2]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==4){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==5){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==6){
      posts = await maintable.find({})
                .populate(fields[0])
                .populate(fields[1])                
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .populate(fields[5])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    
    var p=new maintable();
    console.log('posts',posts);
    p=posts;
    var resultreturn=[];
      console.log('resultreturn: ', resultreturn);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(posts);
  }catch(err){
    console.log('selecteditgeneric: ', err);
    res.json({err});
  }

}


async function selecteditgeneric(req,res){
  console.log(req.body.primaryid);
  console.log(req.body.maintable);
  console.log(JSON.parse(req.body.subtables));
  console.log(JSON.parse(req.body.subtablesflds));
  
  var subtables= JSON.parse(req.body.subtables);
  var fields = JSON.parse(req.body.subtablesflds);
  const subtablesreq=[];
  var index=0;
  subtables.forEach(element=>{
    subtablesreq[index]=require('../models/'+ element +'.model');
    index=index+1;
  });

  const maintable=require('../models/'+ req.body.maintable +'.model');
  var posts;
  try{
    if(subtables.length==0){
      posts = await maintable.find({_id:req.body.primaryid})
                              .exec();
    }
    if(subtables.length==1){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0]).exec();
    }
    if(subtables.length==2){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1]).exec();
    }
    if(subtables.length==3){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[2]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==4){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==5){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==6){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])                
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .populate(fields[5])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    
    var p=new maintable();
    console.log(posts);
    p=posts;
    var resultreturn=[];
    p.forEach(element => {
      // console.log('element', element);
      var resultx1= gridsinglelevel(element);
      resultreturn.push(resultx1); //not to use it
      });
      console.log('resultreturn: ', resultreturn);
      res.json(resultreturn);
  }catch(err){
    console.log('selecteditgeneric: ', err);
    res.json({err});
  }


  // maintable.find({_id:req.body.primaryid}).populate('countryid').exec((err,posts)=>{
  //   if(err){
  //     console.log(err);
  //     res.json({err});
  //   }else{
  //     // console.log(posts);
  //     var p=new maintable();
  //     p=posts;
  //     var resultreturn=[];
  //     p.forEach(element => {
  //     // console.log('element', element);
  //     var resultx1= gridsinglelevel(element);
  //     resultreturn.push(resultx1); //not to use it
  //     });
  //     console.log('resultreturn: ', resultreturn);
  //     res.json(resultreturn);
  //   }
  // });

}

async function selecteditgeneric2(req,res){
  console.log(req.body.primaryid);
  console.log(req.body.maintable);
  console.log(JSON.parse(req.body.subtables));
  console.log(JSON.parse(req.body.subtablesflds));
  
  var subtables= JSON.parse(req.body.subtables);
  var fields = JSON.parse(req.body.subtablesflds);
  const subtablesreq=[];
  var index=0;
  subtables.forEach(element=>{
    subtablesreq[index]=require('../models/'+ element +'.model');
    index=index+1;
  });

  const maintable=require('../models/'+ req.body.maintable +'.model');
  var posts;
  try{
    if(subtables.length==0){
      posts = await maintable.find({_id:req.body.primaryid})
                              .exec();
    }
    if(subtables.length==1){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0]).exec();
    }
    if(subtables.length==2){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1]).exec();
    }
    if(subtables.length==3){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[2]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==4){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3]).exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==5){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])
                .populate(fields[1])
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    if(subtables.length==6){
      posts = await maintable.find({_id:req.body.primaryid})
                .populate(fields[0])
                .populate(fields[1])                
                .populate(fields[2])
                .populate(fields[3])
                .populate(fields[4])
                .populate(fields[5])
                .exec();
                // console.log(fields[0],fields[1],2);
    }
    
    var p=new maintable();
    console.log(posts);
    p=posts;
    
    res.json(p);
  }catch(err){
    console.log('selecteditgeneric: ', err);
    res.json({err});
  }
}

async function selectdrpgeneric(req, res) {

  console.log('selectdrpgeneric');
  console.log(req.body.maintable);
  console.log(req.body.fieldname);
  var fieldname = req.body.fieldname;

  const maintable=require('../models/'+ req.body.maintable +'.model');
  var drparr =[];
  drparr.push({keys:'',values:'--select--'});
  maintable.find({}).exec((err,output)  =>{
    if(err){
      console.log(err);
      res.json({err});
    }else{
      console.log('no error');
    output.forEach(element =>{
      console.log(element);
      var tempelement = { keys:element['_id'],values:element[fieldname] };
      drparr.push(tempelement);
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(drparr);
    }
  });  

}

async function selectsubdrpgeneric(req, res) {

  console.log('selectsubdrpgeneric');
  console.log(req.body.maintable);
  console.log(req.body.fieldname);
  console.log(req.body.query);
  var fieldname = req.body.fieldname;

  const maintable=require('../models/'+ req.body.maintable +'.model');
  var drparr =[];
  drparr.push({keys:'',values:'--select--'});
  maintable.find(JSON.parse(req.body.query)).exec((err,output)  =>{
    if(err){
      console.log(err);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({err});
    }else{
      console.log('no error');
    output.forEach(element =>{
      console.log(element);
      var tempelement = { keys:element['_id'],values:element[fieldname] };
      drparr.push(tempelement);
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(drparr);
    }
  });

}

async function selectautocompletegeneric(req, res) {

  console.log('selectautocompletegeneric');
  console.log(req.body.maintable);
  console.log(req.body.fieldname);
  console.log(req.body.query);
  var fieldname = req.body.fieldname;

  const maintable=require('../models/'+ req.body.maintable +'.model');
  var drparr =[];
  // drparr.push({keys:'',values:'--select--'});
  maintable.find({ "name" : { $regex: '.*' + req.body.query + '.*' } }).exec((err,output)  =>{
    if(err){
      console.log(err);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({err});
    }else{
      
    output.forEach(element =>{
      console.log(element);
      var tempelement = { keys:element['_id'],values:element['name'] };
      drparr.push(tempelement);
    });
    console.log('no error', drparr);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(drparr);
    }
  });

}


async function insertgeneric(req,res){

  console.log(req.body.maintable);
  console.log(req.body.input0);
  const maintable=require('../models/'+ req.body.maintable +'.model');
  var datainsert = JSON.parse(req.body.input0);
  var c= await new maintable(datainsert).save();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({c});

}

async function updategeneric(req,res){

  console.log('updategeneric');
  console.log(req.body.maintable);
  console.log(req.body.input0);
  const maintable=require('../models/'+ req.body.maintable +'.model');
  var datainsert =  JSON.parse( req.body.input0);
  var primaryid = req.body.id;
  console.log(primaryid);
  console.log(datainsert);
  // var c= await new maintable(datainsert).save();
  maintable.findByIdAndUpdate(
    primaryid, datainsert, {new:true }
  ).then(
    result=>{
      console.log("Res=",result);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
      res.json({result});
    }
  ).catch(err => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({err});
  })  

}

function gridlogiccheck(strparams){
  try{
  console.log( JSON.parse(JSON.stringify(strparams)));
  console.log('gridlogiccheck: All Elements: ', Object.keys(JSON.parse(JSON.stringify(strparams))));
  }catch(err){
    console.log(err);
  }
  // Object.keys(strparams).map(element1 => {
  //   console.log('gridlogiccheck: ', element1);
  // })

  return strparams;

}


 function gridsinglelevel(str1) {
  try {
    // console.log('gridsinglelevel : ', JSON.stringify(strparam));
      // var str1={
      //     _id:'123',
      //     statename: 'Maharashtra',
      //     countryid:{
      //         _id:'456',
      //         countryname:'India2',
      //     },
      //     cityid:{
      //         _id:'789',
      //         cityname:'thane',
      //     }
      // };
      //working
      
      var result=[];

      // strparam.forEach( str1 => {
      var result234={};
      str1 = JSON.parse(JSON.stringify(str1));
        // console.log('gridsinglelevel: ', str1);
      Object.keys(str1).map(a=>{
          const b=str1[a];
          if(typeof b == 'object'){
              var temp3=templogic(b,a);
              result234=Object.assign(result234,temp3);
          }else{
              var d={};
              d[a]=b;
              result234=Object.assign(result234,d);
          }
      });
      // console.log('result234',result234);
      result.push(result234);
    // });
    return result234;
  } catch (error2) {
    console.log( 'error: ', error2);
    return {
      error: 'error2',
    };
  }
}

function templogic(obj1,titlekey){
  var result2={};
  Object.keys(obj1).map(c=>{
      if(c=='_id'){
          var d={};
          // var key=titlekey+c;
          var key=titlekey;
          d[key]=obj1[c];
          result2=Object.assign(result2,d);
      }else{
          var d={};
          d[c]=obj1[c];
          result2=Object.assign(result2,d);
      }
  });
  return result2;
}


async function filestreamfs(req,res){

  console.log(JSON.parse(req.body.tables));
  var tables= JSON.parse(req.body.tables);

  console.log('FILE', tables[0]);
  try{
  
    console.log('1');
  // var wstream =   fs.createWriteStream('./server/models/country.model.js');
  // wstream.write("const mongoose = require('mongoose'); const StateSchema = new mongoose.Schema({  statename: {     type: String,     required: true   },   statealiasname: {     type: String,     required: true   },  countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },   createdAt: {     type: Date,     default: Date.now   } }); module.exports = mongoose.model('state', StateSchema,'state');");
  // wstream.end();
  // const temp= await filemodelfs();
  await tables.forEach(element => {
    // var posts =DynamicTable.find({tablename:element}).exec();
    // console.log('aaa',posts);
     DynamicTable.find({tablename:element}).exec( async (err,posts)=>{
        if(err){
          res.status(500).send(err);
        }else{
          console.log('aa',element);
          const temp=  doWriteLogic(element,posts[0].fields);
          // console.log('2',temp);
          // const countryTable = require('../models/'+ element +'.model');
        }
      });
    
    
  });
  res.json({done:'done'});
  // const temp= await doWriteLogic();
  // console.log('2',temp);

  // const countryTable = require('../models/country.model');
  console.log('3');

  //commented
  // const posts=await countryTable.find({}).exec();
  // console.log('4');
  // res.json({posts});
  }catch(err){
    console.log(err);
    res.json({err});
  }

  // await countryTable.find({}).exec( async (err,posts)=>{
  //   if(err){
  //     res.status(500).send(err);
  //   }else{
  //     console.log('result First:', posts);
  //     res.json({posts});
  //   }
  // });
  // res.json({});
}

 async function filemodelfs(){
  
  var wstream =   fs.createWriteStream('./server/models/country.model.js');
  // const writefile=util.promisify(wstream.write);
  // var done=await writefile("const mongoose = require('mongoose'); const StateSchema = new mongoose.Schema({  statename: {     type: String,     required: true   },   statealiasname: {     type: String,     required: true   },  countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },   createdAt: {     type: Date,     default: Date.now   } }); module.exports = mongoose.model('state', StateSchema,'state');");
  wstream.write("const mongoose = require('mongoose'); const StateSchema = new mongoose.Schema({  statename: {     type: String,     required: true   },   statealiasname: {     type: String,     required: true   },  countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },   createdAt: {     type: Date,     default: Date.now   } }); module.exports = mongoose.model('state', StateSchema,'state');");
  wstream.end();
  return '';
}

function doWriteLogic(filename,content){
  return new Promise(function(resolve,reject){
    var wstream =   fs.createWriteStream('./server/models/'+filename+'.model.js');
    wstream.write(content,function(){
    // wstream.write("const mongoose = require('mongoose'); const StateSchema = new mongoose.Schema({  statename: {     type: String,     required: true   },   statealiasname: {     type: String,     required: true   },  countryid: {     type: mongoose.Schema.Types.ObjectId,     ref: 'country'   },   createdAt: {     type: Date,     default: Date.now   } }); module.exports = mongoose.model('state', StateSchema,'state');",function(){
      wstream.end();
      resolve(true);
    });
    
  
  });
}

async function testrelationship(req,res){
        
        
        // var c= new dynamicobj (  ({tablename:'country','fields':{
        //   statename: String,
        // statealiasname : String,
        // countryid: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'country'
        // }}}) );
        // c.save();
        var xobj2 = {'name':'String','aliasname':'String'};
        var schemadynamicx = await new mongoose.Schema(xobj2,{strict:false});
        // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        await mongoose.model('country',schemadynamicx,'country');
        countrySchema= await mongoose.model('country');

         xobj2 = {'statename':'String','statealiasname':'String','countryid':{ type:mongoose.Schema.Types.ObjectId,  ref:'country' }}

        var schemadynamicx2 = await new mongoose.Schema( xobj2,{strict:false});
        // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        await mongoose.model('state',schemadynamicx2,'state');
        stateSchema= await mongoose.model('state');

        
        
        

        stateSchema.find({}).populate("countryid","name").exec((err,posts)=>{
          if(err){
            res.status(500).send(err);
          }else{
            console.log('result First:', posts);
            res.json({});
          }
        });

        // dynamicobj.find({_id:"5bc6f5ae15e37a1880855cf2"}).exec( async (err,posts)=>{

        //   console.log(JSON.stringify(posts[0].fields));
        // var schemadynamicx2 = await new mongoose.Schema( xobj2,{strict:false});
        // // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        // await mongoose.model('state',schemadynamicx2,'state');
        // stateSchema= await mongoose.model('state');

        // stateSchema.find({}).populate("countryid","name").exec((err,posts)=>{
        //   if(err){
        //     res.status(500).send(err);
        //   }else{
        //     console.log('result First:', posts);
        //     res.json({});
        //   }
        // });
        // })


        // var c=new DynamicTable({tablename:'country','fields':{statename: {
        //   type: String,
        //   required: true
        // },
        // statealiasname: {
        //   type: String,
        //   required: true
        // },
        // countryid: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'country'
        // }}}).save();


  
        // xobj2 = {'name':'String','aliasname':'String'};
        // var schemadynamicx = await new mongoose.Schema(xobj2,{strict:false});
        // // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        // await mongoose.model('country',schemadynamicx,'country');
        // countrySchema= await mongoose.model('country');


        // var xobj=[];
        // // xobj2 = {'statename':'String','statealiasname':'String','countryid':{ type:mongoose.Schema.Types.ObjectId,  ref:'country' }}; //working
        // xobj2={'statename':'String'};
        // xobj.push(xobj2);
        // xobj2={'statealiasname':'String'};
        // xobj.push(xobj2);
        // xobj2={'countryid':{ type:mongoose.Schema.Types.ObjectId,  ref:'country' }};
        // xobj.push(xobj2);
        // var schemadynamicx2 = await new mongoose.Schema( xobj,{strict:false});
        // // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        // await mongoose.model('state',schemadynamicx2,'state');
        // stateSchema= await mongoose.model('state');

        // stateSchema.find({}).populate("countryid","name").exec((err,posts)=>{
        //   if(err){
        //     res.status(500).send(err);
        //   }else{
        //     console.log('result:', posts);
        //     res.json({});
        //   }
        // });
      

  
}

async function dynamicdrp(req, res) {

  //country demo
        var xobj2 = {'name':'String','aliasname':'String'};
        var schemadynamicx = await new mongoose.Schema(xobj2,{strict:false});
        // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        await mongoose.model('country',schemadynamicx,'country');
        countrySchema= await mongoose.model('country');

  //country schema demo
  // const statTable = require('../models/state.model');

  var tablenamex = req.body.tblname;
  var fieldname =req.body.fieldname;
  console.log(fieldname);
  
  var schemadynamic;
  var rowschema;

  var xobj=[];
  var x1 = "{'statename': 'String' , 'statealiasname' : 'String', 'countryid':{ 'ref' :'country' }}";
  // xobj.push(x1);
  // x1 = {'statealiasname' : 'String'}
  // xobj.push(x1);
  // x1={'countryid':{ type:  mongoose.Schema.Types.ObjectId, ref :'country' }};
  // x1= {'countryid':{ on:countrySchema._id, required:true,  onModel:'country' }};
  // xobj.push(x1);
  // x1={onModel: {
  //   type: String,
  //   required: true,
  //   enum: ['country']
  // }}
  // xobj.push(x1);
  // { 'statename': 'string', 'statealiasname' : 'string','countryid':{ type:mongoose.Schema.Types.ObjectId,  ref:'country' } };
  // console.log('simple: ',xobj);
  // console.log('stringfy: ', JSON.stringify(xobj));
  // console.log('parse: ',JSON.parse(xobj));
  
  DynamicTable.find({tablename:tablenamex}).exec( async (err,posts)=>{
    if(err){
      res.status(500).send(err);
    }else{
      console.log('fields without parse: ', posts[0].fields);
      // console.log('json object parse', JSON.parse(x1));
      console.log('fields: ', JSON.parse(posts[0].fields));
      var structurename =JSON.parse(posts[0].fields);
      structurename = '{"statename":"string","statealiasname":"string", "countryid": {"type": mongoose.Schema.Types.ObjectId,"ref": "Country"}}';
      
      try {
        rowschema=mongoose.model(tablenamex);
      } catch (error) {
        //console.log('catch error: ', error);
        schemadynamic = await new mongoose.Schema( JSON.parse(structurename) ,{strict:false});
        // schemadynamic = new mongoose.Schema(JSON.parse(structurename),{strict:false});
        mongoose.model(tablenamex,schemadynamic,tablenamex);
        rowschema= await mongoose.model(tablenamex);

        // var objkey=Object.keys(JSON.parse(fieldname));

        

      } 
      schemadynamic.find({}).populate("countryid","name").exec((err,posts)=>{
        if(err){
          res.status(500).send(err);
        }else{
          var temparr=[];
          console.log('result %%$$:  ',posts);
          posts.forEach(element => {
            var abcstr=JSON.stringify(element);
            var objstr=JSON.parse(abcstr);

            console.log(objstr.statename);
            console.log('myelemt ='+element.statename);
            var x = {values:objstr['statename'],keys:element['_id'] };
            console.log(element, x);
            temparr.push(x);  
          });
          
          res.json({posts:temparr});    
        }
      });
    }
  });

  

  // var schemadynamic = new mongoose.Schema( JSON.parse('{"vmProfile": "String"}'),{strict:false});
  
  //console.log(Object.keys(JSON.parse(fieldname)));
  

  
  
  //console.log('generic dynamicdrp ', tablename, ' objkey: ', objkey[0]);



 
}

async function dynamicinsert(req, res) {

  
  var schemadynamic = new mongoose.Schema({vmProfile: String},{strict:false});
  mongoose.model('schemadynamic',schemadynamic,'schemadynamic');

  var rowschema=mongoose.model('schemadynamic');
  var myobj={};
  myobj.vmProfile='mithun2';
  myobj.otherkey='other key2';

  var row=new rowschema(myobj);
  // row.vmProfile ="Atul";
  // row.otherKey="Other Val";
  var c= row.save(
    function(err){
      if(err) throw err;
    }
  );
  res.json({row:c});
}




