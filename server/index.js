const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')
const orgRoutes= require('./routes/orgRoutes')


const app = express()
app.use(express.json())
app.use(cors());
app.use('/auth', authRoutes);
app.use('/org',orgRoutes);

app.listen(3001, () => {
    console.log("3001 ot huni asu.....")
})

