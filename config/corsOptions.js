// from google website, enter the following in the dev console, fetch('http://localhost:3501')
//the site that can access your back end.  

const whitelist=['https://www.eventify.club:3503', 'https://localhost:3503'];
const corsOptions = {    
    origin: (origin, callback) => {
        
        //console.log("corsOptions function");

        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;