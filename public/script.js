$(document).ready(function(){
    $("#generateEventLinks").on("submit", function(event){

        event.preventDefault();
        
        let eventName = $("#eventName").val();
        let eventDate = $("#eventDate").val();
        let eventOwner = $("#eventOwner").val();
        
        var value = {"eventName":eventName, "eventDate": eventDate, "eventOwner":eventOwner}

        $.ajax({        
            url: "https://eventify.club:3503/index.html",
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
});

