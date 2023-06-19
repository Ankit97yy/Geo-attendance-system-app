const { DateTime } = require("luxon");
const { getDate, getDateTime, getTime } = require("./dateTimeFunctions");
const moment = require("moment");

// console.log(DateTime.now().toLocaleString({day:'numeric',month:'short'}))

// console.log(DateTime.fromFormat("2024-04-23", "yyyy-MM-dd").plus({days:10}))

// console.log(DateTime.fromISO('2023-04-19T18:30:00.000Z').toLocaleString({day:'numeric',month:'short'}))
// let dt=DateTime.fromJSDate("2023-04-19T18:30:00.000Z").toFormat("dd-MM-yyyy")
// const time1= DateTime.fromFormat('09:30:00',"HH:mm:ss")
// const t2=DateTime.now().diff(time1,'minute').minutes
// console.log("🚀 ~ file: test.js:12 ~ t2:", t2)
// console.log(Math.floor(t2))
// const o={createdAt:"2023-04-19T18:30:00.000Z"};
// let date= moment("2023-04-29T18:30:00.000Z").add(6,'d').format('DD-MM-YYYY')
//  let d1=DateTime.now();
//  d1=d1.set({hour:0,minute:0,second:0,millisecond:0})
//  console.log("🚀 ~ file: test.js:18 ~ d1:", d1)
const nani=/^\d{10}$/;
let alal=nani.test(9954820620)
console.log("🚀 ~ file: test.js:22 ~ alal:", alal)
