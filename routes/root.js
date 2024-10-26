const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../dbConnection/database');

router.get('^/$|/index(.html)?', async function(req,res){  
    //.get((req,res) => {
        console.log('index.html Get method');
        
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); 
    });

router.post('^/$|/index(.html)?', async function(req,res){  
    try{
        console.log('index.html POST method');
                  
        console.log(req.body);                                
        const { eventName, eventDate, eventOwner } = req.body;        
        
        console.log("eventName: ", eventName);
        console.log("eventDate:", eventDate);
        console.log("eventOwner:", eventOwner);
        
        console.log("DB hit begins");

        //const sqlQuery = "SELECT       EventID,        EventName,        EventDesc,       EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event left join GuestList  on Event.GuestListID = GuestList.GuestListID left join Schedule  on Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ?"
//        sqlQuery =   "SELECT Event.EventID,  Event.EventName,  Event.EventDesc, Event.EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event LEFT JOIN GuestList  	ON Event.GuestListID = GuestList.GuestListID LEFT JOIN Schedule  	ON Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ? or GuestList.GuestListOwner = ? or Schedule.EventDate = ?   ";
        sqlQuery =   "SELECT Event.EventID,  Event.EventName,  Event.EventDesc, Event.EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event LEFT JOIN GuestList  	ON Event.GuestListID = GuestList.GuestListID LEFT JOIN Schedule  	ON Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ?";
        rows = await pool.query(sqlQuery, eventName, eventOwner); // hit the db and
        
        console.log("DB hit ends");

        let resVar = "";

        console.log("looping through the db rows returned")
        console.log('EventID','EventName')
        for (let i = 0; i < rows.length; i++) {
         
            const myEventID = rows[i]['EventID'];      //capture eventid from db
            const myEventName = rows[i]['EventName'];  //capture eventname from db


            console.log(myEventID, '      ', myEventName); //print eventid and eventname to screen

            //create href elements for event
            resVar = resVar + `<a href="https://eventify.club:3503/event.html?eventId=${myEventID}">${myEventName}</a><br>`
        }
        
        //send the href elements to the window browser
        res.send(resVar);        


    } catch (error) {
        res.status(400).send(error.message)
    }        
});

//serve new page route
router.get('/event(.html)?', (req,res) =>{    
    res.sendFile(path.join(__dirname, '..', 'views', 'event.html')); 
});


module.exports = router;