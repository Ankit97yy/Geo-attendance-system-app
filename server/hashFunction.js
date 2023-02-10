const argon2= require('argon2')
async function createHash(password) {
    try {
        const hash = await argon2.hash(password)
        return hash;
    } catch (error) {
        console.log(error);
    }
}

async function verifyHash(hash, password) {
    try {
        if (await argon2.verify(hash, password)) {

            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.log(err); 
    }
}

module.exports={createHash,verifyHash}