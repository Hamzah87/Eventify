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
        rows = await pool.query(sqlQuery, eventName); // hit the db and
        
        console.log("DB hit ends");

        let resVar = "";

        console.log("looping through the db rows returned")
        console.log('EventID','EventName')
        for (let i = 0; i < rows.length; i++) {
         
            const myEventID = rows[i]['EventID'];      //capture eventid from db
            const myEventName = rows[i]['EventName'];  //capture eventname from db


            console.log(myEventID, '      ', myEventName); //print eventid and eventname to screen

            //create href elements for event
            //resVar = resVar + `<a href="https://eventify.club:3503/event.html?eventId=${myEventID}">${myEventName}</a><br>`
            resVar = resVar + `<a href="https://localhost:3503/event.html?eventId=${myEventID}">${myEventName}</a><br>`

        }
        console.log("/index.html POST completed successfully");
        //send the href elements to the window browser
        res.send(resVar);        


    } catch (error) {
        res.status(400).send(error.message)
    }        
});

//serve new page route
router.get('/event(.html)?', async function(req,res){  
    
    console.log("/event.html GET started")

    res.sendFile(path.join(__dirname, '..', 'views', 'event.html')); 
    //res.send(resVar1);
});



//serve new page route
router.post('/event(.html)?', async function(req,res){  
    
    console.log("/event.html GET started")

    const query = req.query;
    console.log("query string: ", query);

    const { eventId } = query;
    
    console.log("DB hit begins");

    //const sqlQuery = "SELECT       EventID,        EventName,        EventDesc,       EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event left join GuestList  on Event.GuestListID = GuestList.GuestListID left join Schedule  on Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ?"
//        sqlQuery =   "SELECT Event.EventID,  Event.EventName,  Event.EventDesc, Event.EventTypeID, Schedule.ScheduleID, GuestList.GuestListID FROM Event LEFT JOIN GuestList  	ON Event.GuestListID = GuestList.GuestListID LEFT JOIN Schedule  	ON Event.ScheduleID = Schedule.ScheduleID WHERE Event.EventName = ? or GuestList.GuestListOwner = ? or Schedule.EventDate = ?   ";
    sqlQuery =   "select Contact.Name, Contact.Address1, Contact.Address2, Contact.City, Contact.State, Contact.Email, Contact.Phone, GuestList.Adults, GuestList.TotalAttendees, GuestList.GuestListOwner, RSVP.RSVP_Recieved, RSVP.RSVP_Sent, RSVP.InvitationSent from Contact join RSVP on Contact.RSVP_ID = RSVP.RSVP_ID join GuestList on RSVP.RSVP_ID = GuestList.RSVP_ID join Event on Event.GuestListID = GuestList.GuestListID where Event.EventID = ?";
    rows = await pool.query(sqlQuery, eventId); // hit the db and
    
    console.log("DB hit ends");

    let resVar1 = "";
    let resVar2 = "";
    let resVar3 = "";

    let Contact_Name = "" 
    let Contact_Address1 = "" 
    let Contact_Address2 = ""
    let Contact_City = ""
    let Contact_State = ""
    let Contact_Email = ""
    let Contact_Phone = ""
    let GuestList_Adults = ""
    let GuestList_TotalAttendees = ""
    let GuestList_GuestListOwner = ""
    let RSVP_RSVP_Recieved = ""
    let RSVP_RSVP_Sent = ""
    let RSVP_InvitationSent = "" 

    console.log("looping through the db rows returned")
    console.log('EventID','EventName')
    for (let i = 0; i < rows.length; i++) {
        
        //const myEventID = rows[i]['EventID'];      //capture eventid from db
        //const myEventName = rows[i]['EventName'];  //capture eventname from db

        Contact_Name = rows[i]['Name'];
        Contact_Address1 = rows[i]['Address1'];
        Contact_Address2 = rows[i]['Address1'];
        Contact_City = rows[i]['City'];
        Contact_State = rows[i]['State'];
        Contact_Email = rows[i]['Email'];
        Contact_Phone = rows[i]['Phone'];
        GuestList_Adults = rows[i]['Adults'];
        GuestList_TotalAttendees = rows[i]['TotalAttendees'];
        GuestList_GuestListOwner = rows[i]['GuestListOwner'];
        RSVP_RSVP_Recieved = rows[i]['Recieved'];
        RSVP_RSVP_Sent = rows[i]['RSVP_Sent'];
        RSVP_InvitationSent = rows[i]['InvitationSent'];
  
        resVar1 = `<div id='familyName' name='familyName'> <p style='display: inline;' id='line' name='line'>${i}</p>  <p style='display: inline;'>|</p> <p style='display: inline;' id='familyname' name='familyname'>${Contact_Name}</p>   </div>`

        console.log("resVar1: ", resVar1);
        console.log('');

        //console.log(myEventID, '      ', myEventName); //print eventid and eventname to screen

        //create href elements for event
        //resVar = resVar + `<a href="https://eventify.club:3503/event.html?eventId=${myEventID}">${myEventName}</a><br>`
        //resVar = resVar + `<a href="https://localhost:3503/event.html?eventId=${myEventID}">${myEventName}</a><br>`
    }

    console.log("/event.html GET completed successfully")
    
    res.sendFile(path.join(__dirname, '..', 'views', 'event.html')); 
    //res.send(resVar1);
});


module.exports = router;