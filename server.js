const express = require('express');
const app = express(), port = 7007;
app.use(express.static('public'));
app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
});
app.use(express.json());
app.get('/', (req, res) => {res.sendFile('index.html', { root: __dirname })});
app.listen(port, () => { console.log(`run server listening on port 7007...`) })