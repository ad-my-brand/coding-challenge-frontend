<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <title>Sud Goyal</title>

    <style type="text/css">
        .error_field{
            color:red;
        }
    </style>
</head>
<body>

<div class="container mt-5">
    <h1>admybrand.com</h1>

    <div class="row">
        <div class="col-6 col-md-3">
            <span id="select_user_error" class="error_field"></span>
            <select id="select_user" name="select_user" class="form-control"></select> <br>
            <span id="title_error" class="error_field"></span>
            <input type="text" id="title" name="title" class="form-control" placeholder="Enter Title"><br>
            <span id="body_error" class="error_field"></span>
            <input type="text" id="body" name="body" class="form-control" placeholder="Enter Body"><br>
            <input type="submit" class="btn btn-primary" id="submit_form" name="submit_form" value="Submit Post">
        </div>
    </div>
</div>



</body>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script>

$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
    async: false,
    dataType: "json",
    success: function (data) {
        console.log(data);
        var select_user_html="";
        select_user_html+="<option value=''>-Select-</option>";
        $(data).each(function(){
            select_user_html+="<option value='"+this.id+"'>"+this.name+"</option>";
        });
        $("#select_user").html(select_user_html);
    },
    error: function (data){
        console.log(data);
    }
});

function send_post_req(){
    var title_val=$("#title").val();
    var body_val=$("#body").val();
    var user_id=$("#select_user").val();
    var is_error=false;

    if(title_val==""){
        $("#select_user_error").html("*Please Select an User");
        is_error=true;

    }else{
        $("#select_user_error").html("");
    }

    if(body_val==""){
        $("#body_error").html("*Body Field can't be empty");
        is_error=true;
    }else{
        $("#body_error").html("");
    }

    if(title_val==""){
        $("#title_error").html("*Title Field can't be Empty");
        is_error=true;
    }else{
        $("#title_error_").html("");
    }
    if(!is_error){

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            type: "POST",
            async: false,
            data:{
                title:title_val,
                body:body_val,
                userId:user_id
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#title").val("");
                $("#body").val("");
                $("#select_user").val("");
                alert("Data Submitted successfully");
                
            },
            error: function (data){
                console.log(data);
                alert("Something Went Wrong");
            }
        });
    }
}

$("#submit_form").click(function(e){
    e.preventDefault();
    send_post_req();

});





</script>
</html>