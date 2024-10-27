$(document).ready(function(){
    $("#generateEventLinks").on("submit", function(event){

        event.preventDefault();
        console.log("generateEventLinks on submit");
        let eventName = $("#eventName").val();
        let eventDate = $("#eventDate").val();
        let eventOwner = $("#eventOwner").val();
        
        var value = {"eventName":eventName, "eventDate": eventDate, "eventOwner":eventOwner}

        $.ajax({        
            url: "/index.html",
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){     
                // alert(res);
                console.log('POST replied: ' + res);
                $("#eventFoundLinks").html(res);                
            }
        })
    })



    function test3()
    {
        console.log('test3');
    }

    $("#flex_box4").on("load", function(event){

        event.preventDefault();

        console.log('flex_box4 on load');
        
        let eventId = getUrlVars()["eventId"]
                
        var value = {"eventName":eventName}

        $.ajax({        
            url: "/event.html",
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){     
                // alert(res);
                console.log('POST replied: ' + res);
                $("#flex_box4").html(res);                
            }
        })
    })
});


document.addEventListener('DOMContentLoaded', function(event) {

    event.preventDefault();

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }


    function getFamilyNameList(href)
    {
        // value determines the information being requested from the backend for the given eventId
        var value = {"familyName":1, "guestInfo":0, "addressContact":0, "invitation":0, "childrenCntSummary":0, "adultsCntSummary":0, "totalCntSummary":0 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){                     
                //console.log('POST replied: ' + res);
                $("#flex_box4").append(res);                
            }
        })
    }

    function getGuestInfo(href)
    {
        // value determines the information being requested from the backend for the given eventId
        var value = {"familyName":0, "guestInfo":1, "addressContact":0, "invitation":0, "childrenCntSummary":0, "adultsCntSummary":0, "totalCntSummary":0 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){                     
                //console.log('POST replied: ' + res);
                $("#flex_box5").append(res);                
            }
        })
    }

    function getAddressAndContact(href)
    {
        // value determines the information being requested from the backend for the given eventId
        var value = {"familyName":0, "guestInfo":0, "addressContact":1, "invitation":0, "childrenCntSummary":0, "adultsCntSummary":0, "totalCntSummary":0 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){                     
                //console.log('POST replied: ' + res);
                $("#flex_box6").append(res);                
            }
        })
    }

    function getGuestListSummaryChildrenCnt(href)
    {
        var value = {"familyName":0, "guestInfo":0, "addressContact":0, "invitation":0, "childrenCntSummary":1, "adultsCntSummary":0, "totalCntSummary":0 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){                     
                console.log('POST replied: ' + res);
                $("#childrenCntSummary").append(res);                
            }
        })
    }

    function getGuestListSummaryAdultsCnt(href)
    {
        var value = {"familyName":0, "guestInfo":0, "addressContact":0, "invitation":0, "childrenCntSummary":0, "adultsCntSummary":1, "totalCntSummary":0 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){                     
                console.log('POST replied: ' + res);
                $("#adultsCntSummary").append(res);                
            }
        })
    }

    function getGuestListSummaryTotalCnt(href)
    {
        var value = {"familyName":0, "guestInfo":0, "addressContact":0, "invitation":0, "childrenCntSummary":0, "adultsCntSummary":0, "totalCntSummary":1 }

        $.ajax({        
            url: href,
            method: "POST",
            //contentType: "application/json",
            //data: JSON.stringify({quote: value}),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional
            data: value,
            success: function(res){     
                // alert(res);
                console.log('POST replied: ' + res);
                $("#totalCntSummary").append(res);                
            }
        })
    }

    let href = window.location.href; //get the page href
    console.log('href: ' + href);    //print to the console the page href

    let myUrl = href.substring(0,href.indexOf('?')); //get the page url
    console.log('myUrl: ' + myUrl);                  //print the page url

    if(myUrl == 'https://localhost:3503/event.html' || myUrl == 'https://eventify.club:3503/event.html') //if the url is the event.html page
    {
        let qs = getUrlVars();  //get the query string 
        //console.log(v);
        
        for(i=0; i<qs.length; i++) // loop through the query String
        {
            console.log(qs[i] + " = " + qs[ qs[i] ]);
        }

        getFamilyNameList(href);
        getGuestInfo(href);
        getAddressAndContact(href);
        getGuestListSummaryChildrenCnt(href);
        getGuestListSummaryAdultsCnt(href);
        getGuestListSummaryTotalCnt(href);
    }
    else
    {
        console.log('not event.html');
    }


    //alert(v);

    /*
    const data = { key1: 'value1', key2: 'value2' };
  
    fetch('/envent.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the response is JSON
    })
    .then(data => {

      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    */

  });


