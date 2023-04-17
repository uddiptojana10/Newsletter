const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
require('dotenv').config();
const https=require("https");


const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    const firstName= req.body.first;
    const secondName=req.body.second;
    const email=req.body.email;
  
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/b767251514";
    
    const apiKey="a4f8c0cdacd7d9ddf2b2fc14e9c61fcd-us21";

    const options={
        method: "POST",
        auth:process.env.API_KEY
        // auth:"uddipto:${apiKey}"
    }

    const request= https.request(url, options, function(response){

        if(response.statusCode==200){
           res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
           
        }

            response.on("data",function(data){
                // console.log(JSON.parse(data));
            })
    })

    request.write(jsonData);
    request.end();
    
});

app.post("/failure",function(req,res){
    res.redirect("/");
    
})

const port=process.env.PORT||3000;

app.listen(port,function(){
    console.log("server started");
});


// API key 86142f8399886a42d48d18c472ecd69f-us21

// List id b767251514