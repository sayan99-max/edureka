//BACK END USED TO CREATE API


const express=require('express');
const app=express();
const port=process.env.PORT || 9700;
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const bodyParser=require('body-parser');
const cors=require('cors');
//const mongourl="mongodb://localhost:27017";

const mongourl="mongodb+srv://sayan:sayan@99@cluster0.zt67v.mongodb.net/edureka?retryWrites=true&w=majority";
let db;


app.use(cors());
//encode data while insert  
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//health ok
app.get('/',(req,res) => {
    res.send("health ok");
    });
    

//location route or city route Api
app.get('/location',(req,res) => {
             
       db.collection('location').find().toArray((err,result) =>{
        if (err) throw err;
        console.log(result)
        res.send(result);  
    })
});


//restaurant route Api
app.get('/restaurant',(req,res) => {
     db.collection('restaurant').find().toArray((err,result) =>{
     if (err) throw err;
     res.send(result);  
 })
 });


//restaurant/id route Api
app.get('/restaurant/:id',(req,res) => {
     var id=req.params.id;
     //console.log(id);
     db.collection('restaurant').find({_id:id}).toArray((err,result) =>{
     if (err) throw err;
     res.send(result);  
     })
 });


 
 app.get('/rest',(req,res) => {
     var condition={}; 

        //get restaurant on basis of  meal-type + cost
        if (req.query.mealtype && req.query.lcost && req.query.hcost) {
            condition={$and:[{"type.mealtype":req.query.mealtype},{cost:{$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}}]}
        }
    
         //get restaurant on basis of city +  meal-type
         else if (req.query.city && req.query.mealtype) {
             condition={$and:[{city:req.query.city},{"type.mealtype":req.query.mealtype}]}
           }    
           
            //get restaurant on basis of cuisine +  meal-type
           else if (req.query.cuisine && req.query.mealtype) {
               condition={$and:[{"Cuisine.cuisine":req.query.cuisine},{"type.mealtype":req.query.mealtype}]}
            }

         //get restaurant/city    
           else if (req.query.city) {
              condition={city:req.query.city};
              
          }

         //get restaurant/meal-type
         else if (req.query.mealtype) {
            condition={"type.mealtype":req.query.mealtype}
        } 

        //get restaurant/cuisine
         else if (req.query.cuisine) {
         condition={"Cuisine.cuisine":req.query.cuisine}
         }

        


        db.collection('restaurant').find(condition).toArray((err,result) =>{
          if (err) throw err;
          console.log(result)
          res.send(result)  
          })
});


//mealtype route Api
    app.get('/mealtype',(req,res) => {
     db.collection('mealtype').find().toArray((err,result) =>{
     if (err) throw err;
     res.send(result);  
    })
    });

 //cuisine route or city route Api
     app.get('/cuisine',(req,res) => {
       db.collection('cuisine').find().toArray((err,result) =>{
        if (err) throw err;
        console.log(result)
        res.send(result);  
    })
    });


    //place order
     app.post('/placeorder',(req,res) => {
      db.collection('orders').insert(req.body,(err,result) =>{
        if (err) console.log(err);
        res.status(200).send('Data Added');  
    })
});


//get all bookings
app.get('/orders',(req,res) => {
    db.collection('orders').find().toArray((err,result) =>{
        if (err) console.log(err);
        res.status(200).send(result);  
    })
});




 

  MongoClient.connect(mongourl,(err,connection) => {
    if (err) console.log(err);
    db=connection.db('edureka');

    app.listen(port,(err) => {
        if (err) throw err;
        console.log(`server is running on port number ${port}`);
    });

})  ;





/*//first route
app.get('/first',function(req,res)  {
    res.send("first route");
    });
    

//second route
app.get('/second',function(req,res)  {
res.send("second route");
});*/



/*app.listen(port,function(err){
    if (err) throw err;
    console.log(`server is running on port number ${port}`)});*/



 //mealtype route
 /*app.get('/mealtype',(req,res) => {
  
 db.collection('mealtype').find().toArray((err,result) =>{
    if (err) console.log(err);
    res.send(result);  
})
});

   



      
        
        

        //get restaurant on basis of city and  meal-type
        else if (req.query.city && req.query.mealtype) {
            condition={$and:[{city:req.query.city},{"type.mealtype":req.query.mealtype}]}
           }

           //get restaurant on basis of cuisine and  meal-type
        else if (req.query.cuisine && req.query.mealtype) {
            condition={$and:[{"Cuisine.cuisine":req.query.cuisine},{"type.mealtype":req.query.mealtype}]}
           }

             //get restaurant on basis of  meal-type and cost
        if (req.query.mealtype && req.query.lcost && req.query.hcost) {

            condition={$and:[{"type.mealtype":req.query.mealtype},{cost:{$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}}]}
           }


        db.collection('restaurant').find(condition).toArray((err,result) =>{
        if (err) console.log(err);
            res.send(result);  
        })
        });
        


//place order
app.post('/placeorder',(req,res) => {
    db.collection('orders').insert(req.body,(err,ans) =>{
    if (err) throw(err);
    res.status(200).send('Data Added');  
})
});

//to get list of orders
 //'API' To see list of students
    app.get('/getOrder',(req,res) => {
    db.collection('orders').find().toArray((err,ans) =>{
    if (err) throw err;
    res.status(200).send(ans);  
})
});*/




    
    

 //git remote add origin http://github.com/sayan99-max/edureka.git
