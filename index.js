const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


//midelwair

app.use(cors());
app.use(express.json());





app.get('/' , (req , res)=>{
    res.send('ema-johon simple is run')
});

app.listen(port , ()=>{
    console.log(`ema-john-simple is run ${port}`);
})