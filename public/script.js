$(document).ready(function(){
    $("#eventListUpdateByName").on("submit", function(event){
    event.preventDefault();
    let value = $("#eventName").val();
            
        $.ajax({            
            url: "/index",
            method: "POST",
            //dataType : "html",
            contentType: "application/json",
            data: JSON.stringify({quote: value}),
            //data : data,            
            success: function(res){                
                $("#myQuote").html(`Quote: ${res.response}`);
                
            }
        })
    })
});
// https://stackoverflow.com/questions/18701282/what-is-content-type-and-datatype-in-an-ajax-request

$(document).ready(function(){
        $("#eventListUpdateByDate").on("submit", function(event){

        event.preventDefault();
        let value = $("#eventDate").val();
            
        $.ajax({            
            url: "/index",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({quote: value}),
            success: function(res){
                //alert(value);
                $("#myQuote").html(`Quote: ${res.response}`);
            }
        })
    })
});

$(document).ready(function(){
    $("#eventListUpdateByOwner").on("submit", function(event){

    event.preventDefault();
    let value = $("#eventOwner").val();
        
    $.ajax({        
        url: "/index",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({quote: value}),
        success: function(res){
            $("#myQuote").html(`Quote: ${res.response}`);
        }
    })
})
});



$(document).ready(function(){
    $("#generateEventLinks").on("submit", function(event){

        event.preventDefault();
        
        let eventName = $("#eventName").val();
        let eventDate = $("#eventDate").val();
        let eventOwner = $("#eventOwner").val();
        
        var value = {"eventName":eventName, "eventDate": eventDate, "eventOwner":eventOwner}

        $.ajax({        
            url: "/index",
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

