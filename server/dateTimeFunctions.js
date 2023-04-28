const now = new Date();
const { DateTime } = require("luxon");


function getDateTime(){
// const year = now.getFullYear();
// const month = String(now.getMonth() + 1).padStart(2, '0');
// const day = String(now.getDate()).padStart(2, '0');
// const hour = String(now.getHours()).padStart(2, '0');
// const minute = String(now.getMinutes()).padStart(2, '0');
// const second = String(now.getSeconds()).padStart(2, '0');
// return`${year}-${month}-${day} ${hour}:${minute}:${second}`;
return DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")
}


function getTime(){
// const currentTime = new Date();
// const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });
// return (formattedTime);
return DateTime.now().toFormat("HH:mm:ss")

}
function getDate(){
// const year = now.getFullYear();
// const month = String(now.getMonth() + 1).padStart(2, '0');
// const day = String(now.getDate()).padStart(2, '0');
// return `${year}-${month}-${day}`

return DateTime.now().toFormat("yyyy-MM-dd")
}
module.exports={getDateTime,getTime,getDate}