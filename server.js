const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

const data = fs.readFileSync(
  path.join(__dirname, 'countries.json'),
  'utf8'
);
const parsed_data = JSON.parse(data);

const dataa = fs.readFileSync(
  path.join(__dirname, 'flag-countries.json'),
  'utf8'
);
const parsed_dataa = JSON.parse(dataa);

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

app.post('/savee', (req,res)=>{
    const diff = req.body.difficulty.toLowerCase();
    const continent = req.body.continent.toLowerCase();
    const a = parsed_dataa.filter(p=>p.diff==diff);
    const b = a.filter(c=>c.continent==continent);
    console.log(b.length);
    const randomnum = Math.floor(Math.random() * b.length);
    const givingvalue = b[randomnum];
    console.log(givingvalue);

    res.json({
        success: true,
        country: givingvalue
    })
    console.log("DONE");

})

app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`);
})
