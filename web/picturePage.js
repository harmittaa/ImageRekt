$(document).ready(function () {

    /**************************DRAWINGÂ IMAGE*************************/
    var myID = 0;
    var PID = 0;
    var textlimit = 140;
    var commentlimit = 140;
    var titlelimit = 30;
    var rating;
    var imagePath = "";
    var favourited = "";
    localStorage.setItem('timeStamp', Date());

    draw();
    centerize();

    function draw() {
        getImageByIID();
        getImageRating();
        getRateAmount();
        getFavouriteStatus();
        getImageComments();
    }

    function centerize() {
        $('#picturediv').css({"text-align": "center"});
    }


    //LOAD AND PREVIEW IMAGE
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });



// LEAVINGÂ AÂ COMMENTÂ Â INÂ THEÂ id=commentdiv
    $('#submitcomment').click(function () {
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                if ($('#commentfield').val() === '') {
                    alert("You cannot leave an empty comment.");
                }
                else {
                    var commentDate = localStorage.getItem('timeStamp');
                    var newcomment = $('#commentfield').val();
                    $('#commentfield').val('');
                    commentImage(newcomment);
                }
            }
        } else {
            alert("Not logged in!");
        }
//        if ($('#commentfield').val() === '') {
//            alert("You cannot leave an empty comment.");
//        }
//        else {
//            var commentDate = localStorage.getItem('timeStamp');
//            var newcomment = $('#commentfield').val();
//            $('#commentfield').val('');
//            commentImage(newcomment);
//        }

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
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                rateImage(1);
            }
        } else {
            alert("Not logged in!");
        }
//        rateImage(1);
    });
    $("#rate2").click(function () {
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                rateImage(2);
            }
        } else {
            alert("Not logged in!");
        }

//        rateImage(2);
    });
    $("#rate3").click(function () {
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                rateImage(3);
            }
        } else {
            alert("Not logged in!");
        }

//        rateImage(3);
    });
    $("#rate4").click(function () {
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                rateImage(4);
            }
        } else {
            alert("Not logged in!");
        }

//        rateImage(4);
    });
    $("#rate5").click(function () {
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                rateImage(5);
            }
        } else {
            alert("Not logged in!");
        }

//        rateImage(5);
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
        if (localStorage.hasOwnProperty("user")) {
            if (localStorage.getItem("user") === "802") {
                alert("Not logged in");
            } else {
                if (localStorage.getItem("fav") === "true") {
                    unFavouriteImage();
                } else {
                    favouriteImage();
                }
            }
        } else {
            alert("Not logged in!");
        }

//        favouriteImage();
    });

//UPLOADÂ BUTTON
    $('#uploadbutton').click(function () {
        $('#uploadUpMod').modal('show');
    });

    var user = {
        data: {user: localStorage.getItem('user')}
    };

//UPLOAD BUTTON
    $('#uploadbutton').click(function () {
        $('#uploadUpMod').modal('show');
    });

    var options = {
        data: {user: localStorage.getItem('user')},
        target: "#hiddenResponse",
        resetForm: true,
        clearForm: true,
        success: showResponse
    };


//NEW UPLOAD BUTTON
    $("#upload").click(function () {
        var titlelength = $('#titleinput').val();
        var descriptionlength = $('#descriptioninput').val();
//        var firstlength = titlelength.length;
//        var secondlength = descriptionlength.length;
        //TODO: KUVALLE CHECKI TYHJÄN VARALTA?!

        if (titlelength.length < 1 || descriptionlength.length < 1) {
            alert("You have to give title and description to your upoload!");
            event.preventDefault();
        }
        else {
//            alert("clicky");
            $("#uploadform").ajaxSubmit(options);
//            alert("Success! ");
            return false;
        }
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
        if (localStorage.getItem('loggedin') === "true") {
            findUserImages();
        } else {
            $('#logInMod').modal('show');
        }
    });

//SEARCH
    $('#search').click(function () {
        $('#searchMod').modal('show');
    });

    $("#submitsearch").click(function () {
        event.stopPropagation();
//        alert("Search button clicked " + searchTitle + " " + searchUser);
        searchTitle = "";
        searchUser = "";
        searchDesc = "";
        searchDesc = $("#searchboxDesc").val();
        searchTitle = $("#searchbox").val();
        searchUser = $("#searchboxUser").val();
//        alert("Search button values in place " + searchTitle + " " + searchUser);
        if (searchTitle === "" && searchUser === "" && searchDesc === "") {
            alert("Put something in the box");
        }
        else if (searchTitle.length > 0 && searchUser.length > 0) {
            alert("Only input one search query");
        }
        else if (searchTitle.length > 0 && searchDesc.length > 0) {
            alert("Only input one search query");
        }
        else if (searchUser.length > 0 && searchDesc.length > 0) {
            alert("Only input one search query");
        }
        else if (searchTitle.length > 0) {
            findImageByTitle(searchTitle);
        }
        else if (searchUser.length > 0) {
            findUsernameImages(searchUser);
        }
        else if (searchDesc.length > 0) {
            findImageByDesc(searchDesc);
        }
    });

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

    $('#logincheck').click(function () {
        username = $("#usernameLogIn").val();
        password = $("#passwordLogIn").val();
//        alert("Username " + username + " password " + password);
        checkUserLogin(username, password);

//        logged = true;
    });

    //LOG OUT
    $("#logout").click(function () {
//        alert("bye bye");
        localStorage.setItem("loggedin", "false");
        localStorage.setItem("user", "");
        location.reload();
    });



//FORGOTÂ PASSWORD
    $('#forgotpass').click(function () {
        $('#forgotMod').modal('show');
    });

//RETRIEVEÂ PASSWORD
//TODO salasana e-mailiin

// MY FAVOURITES
    $("#myfavourites").click(function () {
        getFavourites();
    });

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
            alert("Don't leave it blank!");
            event.preventDefault();
        }

        if (password !== passwordconf) {
            alert("Passwords don't match!");
            event.preventDefault();
        }


        var username = $('#username').val();
        var email = $('#email').val();

        createUser(username, password, email);

    });
    /**************************NAVBARÂ FUNCTIONS*************************/


    if (localStorage.getItem("loggedin") === "true") {
        $("#signup").hide();
        $("#login").hide();
    } else {
        $("#logout").hide();
        $("#myfavourites").hide();
        $("#myprofile").hide();
    }

    if (localStorage.getItem("user") === "") {
        localStorage.setItem("user", "802");
    }

    if (!localStorage.hasOwnProperty("user")) {
        localStorage.setItem("user", "802");
    }

    if (!localStorage.hasOwnProperty("loggedin")) {
        localStorage.setItem("loggedin", "false");
    }

}); //DOCUMENTÂ READY

var iid = 0;
var uid = 0;
var comment = "";
var user = "";
var time = "";
var placeholderID = "placeholder";


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
                        $('#picturediv').append('<a class="picture" id="' + value + '" href="http://192.168.56.1/test/' + value + '">\
                        <img src="http://192.168.56.1/test/' + value + '" width="500" height="500" class="img-thumbnail" alt="image"></a>');

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
//                alert("comments update");
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
//            alert("Last " + response);
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
//            alert("Rating " + response);
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
//                alert("rating changed");
            } else {
//                alert("new rating");
            }
            getImageRating();
            getRateAmount();
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
//                alert("Picture already fav");
                favourited = "true";
                location.reload();
            }
            else {
//                alert("favourited");
                favourited = "true";
            }
        }
    });
}

function getRateAmount() {
    iid = localStorage.getItem('chosenImage');
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/getRateAmount/" + iid,
        dataType: "text",
        success: function (response) {
            if (response === "no rating") {
                $("#totalRatings").text("No ratings");
            }
            else {
                $("#totalRatings").text("Total ratings " + response);
            }
        }
    });
}

function getFavouriteStatus() {
    iid = localStorage.getItem('chosenImage');
    uid = localStorage.getItem("user");
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/getFavouriteStatus/" + iid + "/" + uid,
        dataType: "text",
        success: function (response) {
            if (response === "favourite") {
//                $("#totalRatings").append("Total ratings " + response);
                $("#favourite").css("background", "#EF5350");
                $("#favSpan").css("background", "#EF5350");
                $("#favSpan").text("Unfavourite");
                favourited = "true";
                localStorage.setItem("fav", "true");
            }
            else {
                $("#favourite").css("background", "#ABABAB");
                favourited = "false";
                localStorage.setItem("fav", "false");
            }
        }
    });
}

function unFavouriteImage() {
    iid = localStorage.getItem('chosenImage');
    uid = localStorage.getItem("user");
//    alert("Unfav");
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/unfavouriteImage/" + iid + "/" + uid,
        dataType: "text",
        success: function (response) {
            if (response === "done") {
                $("#totalRatings").append("Total ratings " + response);
                $("#favourite").css("background", "#ABABAB");
                $("#favSpan").css("background", "#ABABAB");
                $("#favSpan").text("Favourite");
                favourited = "false";
                localStorage.setItem("fav", "false");
                location.reload();
            }
        }
    });
}

function checkUserLogin(username, password) {
//    alert("In method User " + username + " pass " + password);
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
                logged = true;
                location.reload();
            }
        }
    });
}

function showResponse(responseText) {
    localStorage.setItem("chosenImage", responseText);
    getImageDescription(responseText);
    window.location = "picturePage.html";
}

function findUserImages() {
    uid = localStorage.getItem("user");
    $("#picturediv").empty();
//    alert("searching user images!");
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findUserImages/" + uid, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index" + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("nr3 inxed " + index + " value " + value);
                    if (index === ("path")) {
                        $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
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
    });
}

function createUser(username, password, email) {
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/registerUser/" + username + "/" + email + "/" + password,
        dataType: "text",
        success: function (response) {
            if (response === "CREATED") {
//                alert("USER CREATED");
                $('#signUpMod').modal('hide');
            }
            else {
//                alert("UNAME_FOUND");
            }
        }
    });
}

function findImageByTitle(title) {
//    alert("Searching with title");
    console.log("Searcing title " + title);
    $("#picturediv").empty();
    $('#searchMod').modal('hide');
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findImageByTitle/" + title, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index" + index + " value " + value);
                if (index === ("path")) {
                    $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
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
        $(".picture").click(function () {
            chosenImage = $(this.id);
            console.log("user clicked " + chosenImage + " and");
//            alert("user clicked " + this.id);
            localStorage.setItem('chosenImage', this.id);
        });
    });
}

function findUsernameImages(username) {
//    alert("Searching with username");
    console.log("Searcing username " + username);
    $("#picturediv").empty();
    $('#searchMod').modal('hide');
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findUsernameImages/" + username, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index" + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("nr 3index " + index + " value " + value);
                    if (index === ("path")) {
                        $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
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
//            alert("user clicked " + this.id);
            localStorage.setItem('chosenImage', this.id);
        });
    });
}

function getFavourites() {
    $("#picturediv").empty();
    uid = localStorage.getItem("user");
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getFavourites/" + uid, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index" + index + " value " + value);
                if (index === ("path")) {
                    $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
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
        $(".picture").click(function () {
            chosenImage = $(this.id);
            console.log("user clicked " + chosenImage + " and");
//            alert("user clicked " + this.id);
            localStorage.setItem('chosenImage', this.id);
        });
    });
}

function findImageByDesc(desc) {
    $("#picturediv").empty();
    $('#searchMod').modal('hide');
//    alert("searching wiht desc");
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findImageByDesc/" + desc, function (data) {
        $.each(data, function (index, value) {
            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                console.log("Nr2 index" + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr3 index" + index + " value " + value);
                    if (index === ("path")) {
                        $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
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
//            alert("user clicked " + this.id);
            localStorage.setItem('chosenImage', this.id);
        });
    });
}