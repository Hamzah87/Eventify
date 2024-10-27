$(document).ready(function(){
    $("#generateEventLinks").on("submit", function(event){

        event.preventDefault();
        
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
                $("#eventFoundLinks").html(res);                
            }
        })
    })

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


    $("#flex_box4").on("load", function(event){

        event.preventDefault();
        
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
                $("#flex_box4").html(res);                
            }
        })
    })
});




