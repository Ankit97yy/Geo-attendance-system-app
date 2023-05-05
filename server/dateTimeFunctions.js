const { DateTime } = require("luxon");


function getDateTime(){

return DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")
}


function getTime(){
return DateTime.now().toFormat("HH:mm:ss")

}
function getDate(){
return DateTime.now().toFormat("yyyy-MM-dd")
}

module.exports={getDateTime,getTime,getDate}