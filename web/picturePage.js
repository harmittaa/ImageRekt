$(document).ready(function () {

    /**************************DRAWINGÂ IMAGE*************************/
    var myID = 0;
    var PID = 0;
    var textlimit = 140;
    var commentlimit = 140;
    var titlelimit = 30;
    var rating;
    var imagePath = "";
    localStorage.setItem('timeStamp', Date());

    draw();
    centerize();

    function draw() {
        getImageByIID();
        getImageComments();
        getImageRating();
    }

    function centerize() {
        $('#picturediv').css({"text-align": "center"});
    }

// LEAVINGÂ AÂ COMMENTÂ Â INÂ THEÂ id=commentdiv
    $('#submitcomment').click(function () {

        if ($('#commentfield').val() === '') {
            alert("You cannot leave an empty comment.");
        }
        else {
            var commentDate = localStorage.getItem('timeStamp');
            var newcomment = $('#commentfield').val();
            $('#commentfield').val('');
            commentImage(newcomment);
        }

//        $('#commentdiv').append('<p> <b>Username:</b> ' + newcomment + '	' + '<i>' + commentDate + '</i>' + '</p>'); //TODOÂ LYHENNÃÂ TIMESTAMP
    });

    /**************************DRAWINGÂ IMAGE*************************/

    /**************************NAVBARÂ FUNCTIONS*************************/
//REMOVEÂ LOADEDÂ FILE
//TODO


//RATING
    $('span').click(function () {
        rating = $('span', 'value');
        //alert($(rating));
        $('this').css({"color": "red"});
    });

    $("#rate1").click(function () {
        rateImage(1);
    });
    $("#rate2").click(function () {
        rateImage(2);
    });
    $("#rate3").click(function () {
        rateImage(3);
    });
    $("#rate4").click(function () {
        rateImage(4);
    });
    $("#rate5").click(function () {
        rateImage(5);
    });

    $("#facebookShare").click(function () {
        getImagePath();
        $(this).attr("target", '_blank');
        $(this).attr("onClick", '"window.open(this.href,"targetWindow","toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"); return false"');
        $(this).attr("href", 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://192.168.56.1/test/' + imagePath + '&p\
        [images][0]=&p[title]=Look at this pic!!&p[summary]=Summary!');
    });

    $("#twitterShare").click(function () {
        getImagePath();
        var url = "http://192.168.56.1/test/" + imagePath;
        var twitterWindow = window.open('https://twitter.com/share?url=' + url, 'twitter-popup', 'height=350,width=600');
        if (twitterWindow.focus) {
            twitterWindow.focus();
        }
        return false;
    });

    $("#randomImage").click(function () {
        getRandomImage();
    });
    
    $("#favourite").click(function () {
        favouriteImage();
    });

//UPLOADÂ BUTTON
    $('#uploadbutton').click(function () {
        $('#uploadUpMod').modal('show');
    });

    var user = {
        data: {user: localStorage.getItem('user')}
    };

//NEW UPLOAD BUTTON
    $("#upload").click(function () {
        alert("clicky");
        $("#uploadform").ajaxSubmit(user);
        alert("Success!");
        return false;
    });

//TITLEÂ LIMIT
    $('#titleinput').keyup(function () {
        var tlength = $(this).val().length;
        $(this).val($(this).val().substring(0, titlelimit));
        var tlength = $(this).val().length;
        remain = parseInt(tlength);
    });



//DESCRIPTIONÂ LIMIT
    $('#descriptioninput').keyup(function () {
        var tlength = $(this).val().length;
        $(this).val($(this).val().substring(0, textlimit));
        var tlength = $(this).val().length;
        remain = parseInt(tlength);
        $('#remain').text(remain);
    });


//COMMENTÂ LIMIT
    $('#commentfield').keyup(function () {
        var tlength = $(this).val().length;
        $(this).val($(this).val().substring(0, commentlimit));
        var tlength = $(this).val().length;
        remain = parseInt(tlength);
    });

//LOGOÂ HOMEBUTTON
    $('#logo').click(function () {
        window.location = "index.html";
    });

//HOMEÂ BUTTON
    $('#home').click(function () {
        window.location = "index.html";
    });

//BUTTONÂ TOÂ MYÂ PROFILEÂ PAGE
    $('#myprofile').click(function () {
        window.location = "index.html";
        //TODO:Â IFÂ NOTÂ LOGGEGÂ INÂ THENÂ TOÂ LOGÂ INÂ PAGE
    });

//SEARCH
    $('#search').click(function () {
        $('#searchMod').modal('show');
    });

//SUBMITÂ SEARCH
//TODO!!!

//LOGINÂ MODALÂ FROMÂ HAMBURGER
    $('#login').click(function () {
        $('#logInMod').modal('show');
    });

//REGISTERÂ FROMÂ LOGÂ IN
    $('#notuser').click(function () {
        $('#signUpMod').modal('show');
    });

//LOGÂ INÂ FROMÂ REGISTER
    $('#alreadyuser').click(function () {
        $('#logInMod').modal('show');
    });

//LOGINÂ CHECKÂ FROMÂ LOGINÂ MODAL
    /*$('#logincheck').click(function(){
     TODO: tarkista matchaakÃ¶ kÃ¤yttÃ¤jÃ¤nimi ja salasana tietokannan kanssa!
     sen jÃ¤lkeen close loginmod
     });*/



//FORGOTÂ PASSWORD
    $('#forgotpass').click(function () {
        $('#forgotMod').modal('show');
    });

//RETRIEVEÂ PASSWORD
//TODO salasana e-mailiin


//SIGNÂ UPÂ MODALÂ FROMÂ HAMBURGER
    $('#signup').click(function () {
        $('#signUpMod').modal('show');
    });

//SINGÂ UPÂ CHECKÂ FROMÂ SIGNÂ UPÂ MODAL
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
    /**************************NAVBARÂ FUNCTIONS*************************/


}); //DOCUMENTÂ READY

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
                        $('#picturediv').append('<img src="http://192.168.56.1/test/' + value + '" width="500" height="500" class="img-thumbnail" alt="image">');
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
                $("#commentdiv").append('<div class="col-sm-5"><div class="panel panel-default"><div class="panel-heading">\
                <strong id="username">' + user + '</strong> <span class="text-muted" id="timestamp">' + time + '</span></div><div class="panel-body" id="commentbubble">\
                ' + comment + ' </div></div></div><br>');
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
            // empty the comments and then load all the comments
            $('#commentdiv').empty();
            $('#commentdiv').append("<h4>Comments</h4>");
            getImageComments();
        }
    });
}

function getImageRating() {
    iid = localStorage.getItem('chosenImage');
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/checkRating/" + iid,
        dataType: "text",
        success: function (response) {
            alert("Rating " + response);
            $("#currentRatingBox").empty();
            $("#currentRatingBox").append("Current avg rating " + response + ".");
        }
    });
}

function rateImage(rating) {
    iid = localStorage.getItem('chosenImage');
    uid = localStorage.getItem("user");
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/rateImage/" + uid + "/" + iid + "/" + rating + "/",
        dataType: "text",
        success: function (response) {
            if (response === "CHANGED") {
                alert("rating changed");
            } else {
                alert("new rating");
            }
            getImageRating();
        }
    });
}

function getImagePath() {
    iid = localStorage.getItem('chosenImage');
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/getImagePath/" + iid,
        dataType: "text",
        success: function (response) {
            imagePath = response;
        }
    });
}

function getRandomImage() {
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/findRandomImage/",
        dataType: "text",
        success: function (response) {
            localStorage.setItem("chosenImage", response);
            window.location = "picturePage.html";
        }
    });
}

function favouriteImage() {
    iid = localStorage.getItem('chosenImage');
    uid = localStorage.getItem("user");
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/favouriteImage/" + iid + "/" + uid,
        dataType: "text",
        success: function (response) {
            if (response === "ALREADY") {
                alert("Picture already fav");
            }
            else {
                alert("favourited");
            }
        }
    });
}

