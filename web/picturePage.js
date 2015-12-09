$(document).ready(function () {

    /**************************DRAWING IMAGE*************************/
    var myID = 0;
    var PID = 0;
    localStorage.setItem('timeStamp', Date());

    draw();
    centerize();

    function draw() {
        getImageByIID();
        //Create placeholder spaces for images and text fields
        $('#picturediv').append('<img id=' + myID + ' src="" width="300" height="300" alt="image">');
        $('#picturediv').append('<p id=' + PID + '>"TITLE"</p>');
        $('#picturediv').append('<p id=' + PID + '>"DESCRIPTION Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu."</p>');

        //get item path from local storage
        var piirrä = localStorage.getItem('valittuKuva');

        //Draw images into their places
        $('#' + myID).attr("src", piirrä);

        //attribute textfield for image
        $('#' + myID).text("KUVA-ATTRIBUUTTI");
    }

    function centerize() {
        $('#picturediv').css({"text-align": "center"});
    }

// LEAVING A COMMENT  IN THE id=commentdiv
    $('#submitcomment').click(function () {
        var commentDate = localStorage.getItem('timeStamp');
        var newcomment = $('#commentfield').val();
        $('#commentfield').val('');
        $('#commentdiv').append('<p> <b>Username:</b> ' + newcomment + '	' + '<i>' + commentDate + '</i>' + '</p>'); //TODO LYHENNÄ TIMESTAMP
    });

    /**************************DRAWING IMAGE*************************/

    /**************************NAVBAR FUNCTIONS*************************/
//LOGO HOMEBUTTON
    $('#logo').click(function () {
        window.location = "file:///Users/Juhani/Desktop/frontEnd/homePage.html";
    });

//HOME BUTTON
    $('#home').click(function () {
        window.location = "file:///Users/Juhani/Desktop/frontEnd/homePage.html";
    });

//BUTTON TO MY PROFILE PAGE
    $('#myprofile').click(function () {
        window.location = "file:///Users/Juhani/Desktop/frontEnd/myProfile.html";
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

function getImageByIID() {
    iid = localStorage.getItem('chosenImage');
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getImageByIID/" + iid, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index " + index + " value " + value);
                $.each(value, function (index, value) {
                console.log("Nr3 index " + index + " value " + value);


//                    if (index === "title") {
//                        console.log("this is the compare for image " + index.localeCompare("title"));
//                        console.log("image found " + index);
//                        $("#responseDIV").append("<p>" + value + "</p><br>");
//                    }
//                    else if (index === "path") {
//                        console.log("Title found " + index);
//                        $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'><br>");
//                    }
//                    else if (index === "iid") {
//                        console.log("IID found " + index);
//                    }
                });
            });
        });
    });
}