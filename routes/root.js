const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../dbConnection/database');

//serve index page route
//router.get('^/$|/index(.html)?', (req,res) =>{
//router.post('/submit', async function(req,res){    

router.get('^/$|/index(.html)?', async function(req,res){  
    //.get((req,res) => {
        console.log('index.html get');
        // console.log('1111111111111111')
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); 
    });

router.post('^/$|/index(.html)?', async function(req,res){  

    try{

        console.log('2222222222222')            
        console.log(req.body);                                
        const { eventName, eventDate, eventOwner } = req.body;        
        
        //console.log("eventName: ", eventName);
        //console.log("eventDate:", eventDate);
        //console.log("eventOwner:", eventOwner);
        
        //console.log("Before DB");


        //const sqlQuery = "SELECT       EventID,        EventName,        EventDesc,       EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event left join GuestList  on Event.GuestListID = GuestList.GuestListID left join Schedule  on Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ?"
//        sqlQuery =   "SELECT Event.EventID,  Event.EventName,  Event.EventDesc, Event.EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event LEFT JOIN GuestList  	ON Event.GuestListID = GuestList.GuestListID LEFT JOIN Schedule  	ON Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ? or GuestList.GuestListOwner = ? or Schedule.EventDate = ?   ";
        sqlQuery =   "SELECT Event.EventID,  Event.EventName,  Event.EventDesc, Event.EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event LEFT JOIN GuestList  	ON Event.GuestListID = GuestList.GuestListID LEFT JOIN Schedule  	ON Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ?";
        rows = await pool.query(sqlQuery, eventName, eventOwner);
        
        //console.log("After DB");


        let resVar = "";

        for (let i = 0; i < rows.length; i++) {
         
            const myEventID = rows[i]['EventID'];
            const myEventName = rows[i]['EventName'];
            console.log(myEventID, ' ', myEventName);

            resVar = resVar + `<a href="event.html?eventId=${myEventID}">${myEventName}</a><br>`

            //console.log(rows.length)                
        }
        //console.log('PPPPPPPPPPPPP')

        //console.log('returning function');
        res.send(resVar);

        //res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); 
        //res.end();    
        
        } catch (error) {
            res.status(400).send(error.message)
        }        
});

//serve new page route
router.get('/event(.html)?', (req,res) =>{

    
    res.sendFile(path.join(__dirname, '..', 'views', 'event.html')); 

});

module.exports = router;