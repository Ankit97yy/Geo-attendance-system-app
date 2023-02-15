const { string } = require('yup');
const {createHash} =require('../server/hashFunction.js')

async function hash(){
    try {
       let delhiweather= new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("delhieather is 21");
        },2000)
       })
       let bangaloreweather= new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("delhi weather is 23");
        },8000)
       })

    //    delhiweather.then((res)=>console.log(res)).catch((err)=>console.log(err))
    //    console.log("oiii");
    //    bangaloreweather.then((res)=>console.log(res))
    let dw= await delhiweather;
    console.log(dw);
    let bw= await bangaloreweather;
        
    } catch (error) {
        console.log(error);
    }
}
hash()
console.log("hahaha");