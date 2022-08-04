const express = require ("express");
const path = require ('path');
const app = express();

app.listen(3030, ()=>{
    console.log(" ");
})
app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
});
