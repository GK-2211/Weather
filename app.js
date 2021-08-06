const express=require("express");
const bodyParser=require("body-parser");
const http = require("http");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000,function(){
    console.log("Sucessful running")
})

app.get("/",function(req,res){
    
              res.sendFile(__dirname + "/index.html");
       })



app.post("/",function(req,res){
    const query=req.body.CityName;
    http.get("http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b085c69d64c04939a6256a2f0f0c6b66",function(res1){
       console.log(query);

       res1.on("data",function(data){
           const weatherData=JSON.parse(data);
           
           const temp1=weatherData.main.temp;
           console.log(temp1);

           const weatherDescription=weatherData.weather[0].description;
           console.log(weatherDescription);
           
           const icon=weatherData.weather[0].icon;
           console.log(icon);

           res.write("<h1>The current temperature in "+ query +" is : " + temp1 +" degree Celsius</h1>");
           res.write("<h2>The weather is currently : "+ weatherDescription+"</h2>");
           res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
           res.send();
 })
    })    
})