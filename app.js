require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const amount=req.body.am;
    const curr=req.body.cur;
    const newcur=req.body.newcur;
    const apik=process.env.API_KEY;
    const url="https://v6.exchangerate-api.com/v6/"+ apik +"/latest/"+curr;
    https.get(url,function(resp){
        let rspdata="";
        let d="";
        resp.on("data",function(data){
            rspdata+=data;
        });
        resp.on("end",function(){
            d=JSON.parse(rspdata);
            //res.send(d);
            //console.log(d);
            let mult=d.conversion_rates[newcur];
            //console.log(amount);
            //console.log(div);
            let resu=amount*mult;
            res.send(resu.toString());
        });
 
        console.log(resp.statusCode);
    });
})

app.listen(3000,()=>{
    console.log("server running at port 3000");
})
