$(document).ready(function () {

    /**************************DRAWING IMAGES*************************/
    var myID = 0;
    var PID = 0;
    var logged = false;
    var chosenImage;
    var username = "";
    var password = "";
    var textlimit = 140;
    var titlelimit = 30;
    var searchTitle = "";
    var searchUser = "";
    var searchDesc = "";

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
            };

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
//            alert("You have to give title and description to your upoload!");
            event.preventDefault();
        }
        else {
//            alert("clicky");
            $("#uploadform").ajaxSubmit(options);
//            alert("Success! ");
            return false;
        }
    });

    //TITLE LIMIT
    $('#titleinput').keyup(function () {
        var tlength = $(this).val().length;
        $(this).val($(this).val().substring(0, titlelimit));
        var tlength = $(this).val().length;
        remain = parseInt(tlength);
    });


//DESCRIPTION LIMIT
    $('#descriptioninput').keyup(function () {
        var tlength = $(this).val().length;
        $(this).val($(this).val().substring(0, textlimit));
        var tlength = $(this).val().length;
        remain = parseInt(tlength);
        $('#remain').text(remain);
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

//FORGOT PASSWORD
    $('#forgotpass').click(function () {
        $('#forgotMod').modal('show');
    });

//RETRIEVE PASSWORD
//TODO


// MY FAVOURITES
    $("#myfavourites").click(function () {
        getFavourites();
    });

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

        createUser(username, password, email);

//        alert("u-name: " + username +
//                "password: " + password +
//                "passwordconf: " + passwordconf +
//                "e-mail: " + email);

    });

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


    /**************************NAVBAR FUNCTIONS END*************************/

});


$("#username").change(function () {
//    alert("Boo!");
    checkUsername("matti");
});

var placeholderID = "placeholder";

function getJsonGallery() {
    $("#picturediv").empty();
    $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/get_json_gallery", function (data) {
        $.each(data, function (index, value) {
//            console.log("index " + index + " value " + value);
            $.each(value, function (index, value) {
                //  console.log("Nr2 index" + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("nr3 inxed " + index + " value " + value);
                    if (index === ("path")) {
                        $('#picturediv').append('<img id="' + placeholderID + '" class="picture2 img-thumbnail" src="http://192.168.56.1/test/' + value + '" width="300" height="300" alt="image">');
                    }
                    else if (index === ("title")) {
                        $('#picturediv').append('<p id=' + 1321 + '>"' + value + '"</p>');
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
//                alert("login succesful");
                localStorage.setItem('loggedin', true);
                localStorage.setItem('user', response);
                $('#logInMod').modal('hide');
                logged = true;
                location.reload();
            }
        }
    });
}

function getImageDescription(image) {
//    alert("Getting image desc for IID " + image);
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/getImageDescription/" + image,
        dataType: "text",
        success: function (response) {
//            alert("returning response " + response);
            parseDescription(response, image);
        }
    });
}

function showResponse(responseText) {
//    alert("Show response!!!!!");
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

function checkUsername(username) {
    $.ajax({
        type: "GET",
        url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/checkUsername/" + username,
        dataType: "text",
        success: function (response) {
            if (response === "OK") {
//                alert("Uname available");
            }
            else {
//                alert("uname taken!");
            }
        }
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