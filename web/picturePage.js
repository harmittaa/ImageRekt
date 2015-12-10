$(document).ready(function () {

    /**************************DRAWING IMAGE*************************/
    var myID = 0;
    var PID = 0;
    var textlimit = 140;
    var commentlimit =140;
    var titlelimit = 30;
    var rating;
    localStorage.setItem('timeStamp', Date());

    draw();
    centerize();

    function draw() {
        getImageByIID();
        getImageComments();
    }

    function centerize() {
        $('#picturediv').css({"text-align": "center"});
    }

// LEAVING A COMMENT  IN THE id=commentdiv
    $('#submitcomment').click(function () {
        
        if($('#commentfield').vall()===''){
            alert("You cannot leave an empty comment.");
        }
        else{
        var commentDate = localStorage.getItem('timeStamp');
        var newcomment = $('#commentfield').val();
        $('#commentfield').val('');
        commentImage(newcomment);
        }

//        $('#commentdiv').append('<p> <b>Username:</b> ' + newcomment + '	' + '<i>' + commentDate + '</i>' + '</p>'); //TODO LYHENNÄ TIMESTAMP
    });

    /**************************DRAWING IMAGE*************************/

    /**************************NAVBAR FUNCTIONS*************************/
//REMOVE LOADED FILE
//TODO


//RATING
$('span').click(function(){
    rating=$('span', 'value');
    //alert($(rating));
    $('this').css({"color": "yellow"});
});

//UPLOAD BUTTON
    $('#uploadbutton').click(function () {
        $('#uploadUpMod').modal('show');
    });

var user = {
    data : {user : localStorage.getItem('user')}
};

//NEW UPLOAD BUTTON
    $("#upload").click(function () {
        alert("clicky");
        $("#uploadform").ajaxSubmit(user);
        alert("Success!");
        return false;
    });

//TITLE LIMIT
$('#titleinput').keyup(function() {
            var tlength = $(this).val().length;
            $(this).val($(this).val().substring(0,titlelimit));
            var tlength = $(this).val().length;
            remain = parseInt(tlength);
         }); 



//DESCRIPTION LIMIT
 $('#descriptioninput').keyup(function() {
            var tlength = $(this).val().length;
            $(this).val($(this).val().substring(0,textlimit));
            var tlength = $(this).val().length;
            remain = parseInt(tlength);
            $('#remain').text(remain);
         }); 


//COMMENT LIMIT
 $('#commentfield').keyup(function() {
            var tlength = $(this).val().length;
            $(this).val($(this).val().substring(0,commentlimit));
            var tlength = $(this).val().length;
            remain = parseInt(tlength);
         });  

//LOGO HOMEBUTTON
    $('#logo').click(function () {
        window.location = "index.html";
    });

//HOME BUTTON
    $('#home').click(function () {
        window.location = "index.html";
    });

//BUTTON TO MY PROFILE PAGE
    $('#myprofile').click(function () {
        window.location = "index.html";
        //TODO: IF NOT LOGGEG IN THEN TO LOG IN PAGE
    });

//SEARCH
    $('#search').click(function () {
        $('#searchMod').modal('show');
    });

//SUBMIT SEARCH
//TODO!!!

//LOGIN MODAL FROM HAMBURGER
    $('#login').click(function () {
        $('#logInMod').modal('show');
    });

//REGISTER FROM LOG IN
    $('#notuser').click(function () {
        $('#signUpMod').modal('show');
    });

//LOG IN FROM REGISTER
    $('#alreadyuser').click(function () {
        $('#logInMod').modal('show');
    });

//LOGIN CHECK FROM LOGIN MODAL
    /*$('#logincheck').click(function(){
     TODO: tarkista matchaakö käyttäjänimi ja salasana tietokannan kanssa!
     sen jälkeen close loginmod
     });*/



//FORGOT PASSWORD
    $('#forgotpass').click(function () {
        $('#forgotMod').modal('show');
    });

//RETRIEVE PASSWORD
//TODO salasana e-mailiin


//SIGN UP MODAL FROM HAMBURGER
    $('#signup').click(function () {
        $('#signUpMod').modal('show');
    });

//SING UP CHECK FROM SIGN UP MODAL
    $('#signupcheck').click(function () {
        var password = $('#password').val();
        var passwordconf = $('#passwordconf').val();
        var length = password.length;

        if (length < 1) {
            alert("Your password field is empty");
            event.preventDefault();
        }

        if (password != passwordconf) {
            alert("Passwords don't match");
            event.preventDefault();
        }

        var username = $('#username').val();
        var email = $('#email').val();

        alert("u-name: " + username +
                "password: " + password +
                "passwordconf: " + passwordconf +
                "e-mail: " + email);

    });
    /**************************NAVBAR FUNCTIONS*************************/


}); //DOCUMENT READY

var iid = 0;
var uid = 0;
var comment = "";
var user = "";
var time = "";

function getImageByIID() {
    iid = localStorage.getItem('chosenImage');
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getImageByIID/" + iid, function (data) {
        $.each(data, function (index, value) {
//            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
//                console.log("Nr2 index " + index + " value " + value);
                $.each(value, function (index, value) {
//                    console.log("Nr3 index " + index + " value " + value);
                    if (index === "path") {
                        $('#picturediv').append('<img src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
                    }
                    else if (index === "title") {
                        $('#picturediv').append('<p>"' + value + '"</p>');
                    }
                    else if (index === "description") {
                        $('#picturediv').append('<p>"' + value + '"</p>');
                    }

                });
            });
        });
    });
}

function getImageComments() {
    iid = localStorage.getItem('chosenImage');
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getImageComments/" + iid, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr index " + index + " value " + value);
                    if (index === "comment") {
                        console.log("comment found " + value);
                        comment = value;
                    }
                    else if (index === "user") {
                        console.log("User found " + index);
                        user = value;
                    }
                    else if (index === "time") {
                        console.log("Time found " + index);
                        time = value;
                    }
                });
                $('#commentdiv').append('<p> <b>' + user + ':</b> ' + comment + '	' + '<i>' + time + '</i>' + '</p>');
            });
        });
    });
}

function commentImage(comment) {
    iid = localStorage.getItem('chosenImage');
    uid = localStorage.getItem("user");
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/commentImage/" + comment + "/" + iid + "/" + uid,
        dataType: "text",
        success: function (response) {
            alert("Last " + response);
            $("#response").append(response);
            getImageComments();
        }
    });
}