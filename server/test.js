const argon2 = require('argon2')

async function hash() {
    try {
        console.log("one");
        const hash = await argon2.hash("as")
        console.log("two");
        return hash;
    } catch (error) {
        console.log(error);
    }
}
hash().then(res=>console.log(res));
console.log("last");

// async function verify(hashed){
//     try {
//         console.log("three");
//         if (await argon2.verify(hashed, "as")) {
//             console.log("four");
//           return true;
//         } else {
//             return false;
//         }

//       } catch (err) {
//         // internal failure
//       }
// }
// hash().then(hashed=>{
//     verify(hashed).then((res)=>{
//         if(res) console.log("match");
//         else console.log("not match");
//     })
// })