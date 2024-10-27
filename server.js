const express = require('express');
const https = require('https')
const app = express();
const fs = require('fs')
const path = require('path');
const cors = require('cors'); //Cross Origin Resource Sharing (accessing resources over a different network)

const PORT = process.env.PORT || 3503;




const whitelist=['https://www.yoursite.com', 'https://localhost:3503'];
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));

//built-in middleware to handle urlecoded data
//in other words, form data:
//'content-type: application/x-www-form-urlencoded'
//pulls form data that is decoded (as strings)
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//server static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});
    console.log('index.html');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


//cath all blocks
app.all('*',(req, res) =>{
    console.log('404 not found')

    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html')); //send a 404 (not found) status
    }else if(req.accepts('json ')){
        res.json({error: '404 Not Found'});
    }else{
        res.type('txt').send('404 Not Found');
    }
});


//create https server
const sslServer = https.createServer({
    //certificates should go in an enviorment variable for production
    key: fs.readFileSync(path.join(__dirname, 'mockCert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'mockCert','cert.pem')),
},app)

//set a port listener
sslServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))