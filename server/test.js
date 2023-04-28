const { DateTime } = require("luxon");
const { getDate, getDateTime, getTime } = require("./dateTimeFunctions");

// console.log(DateTime.now().toLocaleString({day:'numeric',month:'short'}))

// console.log(DateTime.fromFormat("2024-04-23", "yyyy-MM-dd").plus({days:10}))

// dt=DateTime.fromISO('2023-04-23T18:30:00.000Z')
const time1= DateTime.fromFormat('09:30:00',"HH:mm:ss")
const time2= DateTime.fromFormat('13:28:00',"HH:mm:ss")
if(DateTime.now()>time1 && DateTime.now()<time2) console.log("kakak")