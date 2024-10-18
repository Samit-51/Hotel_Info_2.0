const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const UserAuthRoutes = require('./Routes/UserAuthRoutes');
require('dotenv').config();
const app = express();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URI);
        app.listen(3000);
        console.log('Successfully connected to database.')
    }catch(e){
        console.log(e.message);
    }
}
app.use(express.static(path.join(__dirname,'../fd/dist')));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../fd/dist', 'index.html'));
})
app.use(express.json());
app.use('/api', UserAuthRoutes);
app.use(cors({
    origin: 'http://localhost:3001'
}));
connectDB();