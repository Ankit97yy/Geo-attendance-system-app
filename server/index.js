const express=require('express')
const mysql=require('mysql')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors());
const con= mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"mariamaria",
    database:"test"
})
con.connect((err)=>{
    if(err)
    console.log("error connecting database");
    else
    console.log("database connecte hol")
});
app.get('/home',(req,res)=>{
    res.send("hello")
})

app.post('/register',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    console.log(name,email,password);
    con.query('insert into users values(?,?,?)',[name,email,password],(err,result)=>{
        if(result){
            console.log("database ot humal");
            // confirm.log(result)
            // res.send(result)

        }
        else{
            // res.send({message:"enter correct details"})
            console.log("database ot nuhumal");
        }
    })
})

app.listen(3001,()=>console.log("3001 ot huni asu....."))

