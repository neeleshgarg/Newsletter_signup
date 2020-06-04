const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.first_name;
    const lastName=req.body.last_name;
    const email=req.body.email_id;

    let data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]
    }
    const JSONdata=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/6defd1294c";
    let options={
        method:"POST",
        auth:"neelesh_garg:076c30f2d58235ec0d652d7ec3e76b5a-us10"
    }
    const request=https.request(url,options,function(response){
        if(res.statusCode!==200){
            res.sendfile(__dirname+"/failure.html");
        }
        else{
            res.sendfile(__dirname+"/success.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(JSONdata);
    request.end(); 

});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT||3000,function(){
    console.log("Server Started at port 3000!");
    
});


/* api key=076c30f2d58235ec0d652d7ec3e76b5a-us10 
list id=  */