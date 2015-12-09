$(document).ready(function () {

    /**************************DRAWING IMAGES*************************/
    var myID = 0;
    var PID = 0;
    var logged = false;
    var chosenImage;
    var username = "";
    var password = "";
//    localStorage.setItem('loggedin', logged);

    function loop() {
        getJsonGallery();
    }

    function centerize() {
        $('#picturediv').css({"text-align": "center"});
        $('#uploadbutton').css({"text-align": "left"});
    }
    loop();
    centerize();

    /**************************DRAWING IMAGES*************************/

    /**************************NAVBAR FUNCTIONS*************************/
//LOAD AND PREVIEW IMAGE
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });

//REMOVE LOADED FILE
//TODO

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

//UPLOADCHECK 

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
        var logged = localStorage.getItem('loggedin');
        if (logged == false) {
            alert("you have to log in first");
        }
        else {
            window.location = "myProfile.html";
        }
    });

//SEARCH
    $('#search').click(function () {
        $('#searchMod').modal('show');
    });

//SUBMIT SEARCH
//TODO

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

//LOGIN CHECK FROM LOGIN MODAL TODO: tarkista matchaakö käyttäjänimi ja salasana tietokannan kanssa! sen jälkeen close loginmod
    $('#logincheck').click(function () {
        username = $("#usernameLogIn").val();
        password = $("#passwordLogIn").val();
        alert("Username " + username + " password " + password);
        checkUserLogin(username, password);

        logged = true;
    });


//FORGOT PASSWORD
    $('#forgotpass').click(function () {
        $('#forgotMod').modal('show');
    });

//RETRIEVE PASSWORD
//TODO


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
            alert("Don't leave it blank!");
            event.preventDefault();
        }

        if (password !== passwordconf) {
            alert("Passwords don't match!");
            event.preventDefault();
        }

        var username = $('#username').val();
        var email = $('#email').val();

        alert("u-name: " + username +
                "password: " + password +
                "passwordconf: " + passwordconf +
                "e-mail: " + email);

    });
    /**************************NAVBAR FUNCTIONS END*************************/

});

var placeholderID = "placeholder";

function getJsonGallery() {
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/get_json_gallery", function (data) {
        $.each(data, function (index, value) {
//            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                //  console.log("Nr2 index" + index + " value " + value);
                $.each(value, function (index, value) {
//                    console.log("nr3 inxed " + index + " value " + value);
                    if (index === ("path")) {
                        $('#picturediv').append('<img id="' + placeholderID + '" class="picture2" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
                    }
                    else if (index === ("title")) {
                        $('#picturediv').append('<p id=' + 1 + '>"' + value + '"</p>');
                    }
                    else if (index === ("iid")) {
                        $('#' + placeholderID).attr("id", value);
                        $('#' + value).wrap('<a class="picture" id="' + value + '" href="picturePage.html"></a>');
                    }
                });

            });
        });
        $(".picture").click(function () {
            chosenImage = $(this.id);
            console.log("user clicked " + chosenImage + " and");
            alert("user clicked " + this.id);
            localStorage.setItem('chosenImage', this.id);
        });
    });
}

function checkUserLogin(username, password) {
    alert("In method User " + username + " pass " + password);
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/checkUserLogin/" + username + "/" + password,
        dataType: "text",
        success: function (response) {
            if (response === "false") {
                alert("uname or pass wrong");
            }
            else {
                alert("login succesful");
                localStorage.setItem('loggedin', true);
                localStorage.setItem('user', response);
                $('#logInMod').modal('hide');
            }
        }
    });
}