const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

const data = fs.readFileSync('countries.json', 'utf8');
const parsed_data = JSON.parse(data);

app.post('/save', (req,res)=>{
    const num = req.body.number;
    const diff = req.body.diff;
    const a = parsed_data.filter(p=>p.difficulty==diff);
    const b = a.sort(()=> Math.random()-0.5).slice(0, num);
    res.json({
        success: true,
        countries: b
    })  
})

app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})