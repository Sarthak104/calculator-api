const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

app.get("/", function(req, res){
    res.status(200).send("Hello world!");
})
app.post('/add',function(req, res){
    var num1=req.body.num1;
    var num2=req.body.num2;  
    var result=num1-num2;
    if(typeof num1 === "string" || typeof num2 === "string") {
        res.json({
          status: "failure",
          message: "Invalid data types",
        });
        return; 
    }
        if(num1>1000000 || num2>1000000){
            res.json({
                status: "error",
                message: "Overflow",
            });
            return;
        }
        else{
            res.json({
                    status : "success",
                    message: "the sum of given two number",
                    sum: result,
            });
        }
        
    
    else{
            res.json({
                
                    status: "failure",
                    message: "Invalid data types"
               
            });
    }
});

app.post('/sub',function(req, res){
    var num1=req.body.num1;
    var num2=req.body.num2;  
    var result=num1-num2;

    if((isInt(num1) && isInt(num2)) || (isFloat(num1) && isFloat(num2))){
        if((num1-num2)<-1000000){
            res.json({
                
                    status: "error",
                    message: "Underflow"
                
            });
        }
        else{
            res.json({
                
                    status : "success",
                    message: "the difference of given two number",
                    difference: result,
                
            });
        }
        
    }
    else{
            res.json({
               
                    status: "failure",
                    message: "Invalid data types"
              
        });
        
    }
});

app.post('/multiply',function(req, res){
    var num1=req.body.num1;
    var num2=req.body.num2;  
    var result=num1*num2;
    if((isInt(num1) && isInt(num2)) || (isFloat(num1) && isFloat(num2))){
        if( result > 1000000){
            res.json({
                
                    status: "error",
                    message: "Overflow"
                
            });
            return;
        }
        else{
            res.json({
               
                    status : "success",
                    message: "The product of given numbers",
                    result: result,
               
            });
        }
        
    }
    else{
            res.json({
                
                    status: "failure",
                    message: "Invalid data types"
               
            });
        
    }
});

app.post('/division',function(req, res){
    var num1=req.body.num1;
    var num2=req.body.num2;  
    
    if((isInt(num1) && isInt(num2)) || (isFloat(num1) && isFloat(num2))){
        if(num2 == 0){
            res.json({
                    status: "failure",
                    message: "Cannot divide by zero",
            });
        }

        var result=num1/num2;
        
            res.json({
                
                    status : "success",
                    message: "The division of given numbers",
                    result: result,
            });
        
        
    }
    else{
        res.json({
            status: "failure",
            message: "Invalid data types"
        });
    }
});


// here


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;