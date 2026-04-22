const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)

        console.log('\x1b[32m%s\x1b[0m', '✔ Db Connected')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', '❌ DB Connection Error');
    }
}

module.exports = { db }