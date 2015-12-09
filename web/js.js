/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var username = "";
    var userID;
    var rating;
    var imageID = 123456;
    var tagID = 123456;
    var tagContent = "";
    var imageTitle = "";

    $("#get_json_gallery").change(function () {
        alert("test");
        getJsonGallery();
    });

    $("#getFavourites").change(function () {
        console.log("get favourites started");
        userID = $("#getFavourites").val();
        getFavourites(userID);
    });

    $("#findRandomImage").change(function () {
        findRandomImage();
    });

    $("#namecheck").change(function () {
        username = $("#namecheck").val();
        checkUsername(username);
    });

    $("#ratingcheck").change(function () {
        imageID = $("#ratingcheck").val();
        checkRating(imageID);
    });

    $("#rateImage").change(function () {
        userID = $("#rateImageUID").val();
        imageID = $("#rateImageIID").val();
        rating = $("#rateImageRate").val();
        console.log("UID " + userID + " imageId " + imageID + " rating " + rating);
        rateImage(userID, imageID, rating);
    });

    $("#findImgByTag").change(function () {
        // first find tid by tag content
        console.log("start");
        tagContent = $("#findImgByTag").val();
        console.log("tagContent is " + tagContent);
        findTID(tagContent);
    });

    $("#searchImageTitle").change(function () {
        console.log("start searching for images with title");
        imageTitle = $("#searchImageTitle").val();
        findImageByTitle(imageTitle);
    });

    $("#getImageComments").change(function () {
        console.log("Starting getImagComments");
        imageID = $("#getImageComments").val();
        getImageComments(imageID);
    });

    $("#favouriteImage").change(function () {
        console.log("Starting fav image");
        imageID = $("#favouriteImage").val();
        favouriteImage(imageID);

    });

    $("#unfavouriteImage").change(function () {
        console.log("Starting unfavouriting");
        imageID = $("#unfavouriteImageImage").val();
        username = $("#unfavouriteImageUser").val();
        unfavouriteImage(imageID, username);
    });

    function getJsonGallery() {
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/get_json_gallery", function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    //  console.log("Nr2 index" + index + " value " + value);
                    $.each(value, function (index, value) {
                        console.log("nr3 inxed " + index + " value " + value);
                        if (index.localeCompare("title")) {
                            $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'>");
                        }
                        else if (index.localeCompare("path")) {
                            $("#responseDIV").append("<p>" + value + "</p><br>");
                        }
                    });
                });
            });
        });
    }

    function rateImage(user, image, rate) {
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/rateImage/"+ user + "/" + image + "/" + rate,
            dataType: "text",
            success: function (response) {
                //alert("response " + response);
                if (response === ("NEW")) {
                     $("#responseDIV").append("<p>" + response + "</p><br>");
                }
                else if (response === ("USED")) {
                    $("#responseDIV").append("<p>" + response + "</p><br>");
                }
            }
        });

    }

    function getFavourites(user) {
        console.log("Finding user favourites " + user);
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getFavourites/" + user, function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr2 index " + index + " value " + value);
                    if (index === "title") {
                        console.log("this is the compare for image " + index.localeCompare("title"));
                        console.log("image found " + index);
                        $("#responseDIV").append("<p>" + value + "</p><br>");
                    }
                    else if (index === "path") {
                        console.log("Title found " + index);
                        $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'><br>");
                    }
                    else if (index === "iid") {
                        console.log("IID found " + index);
                    }
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
                //alert("response " + response);
                if (response.localeCompare("OK")) {
                    alert("Username used!");
                }
                else if (response.localeCompare("USED")) {
                    alert("Username not used");
                }
            }
        });
    }

    function checkRating(imageID) {
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/checkRating/" + imageID,
            dataType: "text",
            success: function (response) {
                alert(response);
            }
        });
    }

    function findTID(tagContent) {
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/findTagID/" + tagContent,
            dataType: "text",
            success: function (response) {
                console.log("response in findTID " + response);
                findImgByTag(response);
            }
        });
    }

    function findImgByTag(response) {
        console.log("tag id in last " + response);
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findImageByTag/" + response, function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr2 index " + index + " value " + value);
                    if (index === "title") {
                        console.log("this is the compare for image " + index.localeCompare("title"));
                        console.log("image found " + index);
                        $("#responseDIV").append("<p>" + value + "</p><br>");
                    }
                    else if (index === "path") {
                        console.log("Title found " + index);
                        $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'><br>");
                    }
                    else if (index === "iid") {
                        console.log("IID found " + index);
                    }
                });
            });
        });
    }

    function findImageByTitle(title) {
        console.log("Finding image by the title (in function) " + title);
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findImageByTitle/" + title, function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr2 index " + index + " value " + value);
                    if (index === "title") {
                        console.log("this is the compare for image " + index.localeCompare("title"));
                        console.log("image found " + index);
                        $("#responseDIV").append("<p>" + value + "</p><br>");
                    }
                    else if (index === "path") {
                        console.log("Title found " + index);
                        $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'><br>");
                    }
                    else if (index === "iid") {
                        console.log("IID found " + index);
                    }
                });
            });
        });
    }

    function getImageComments(imageID) {
        console.log("Finding image comments(in function) " + imageID);
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/getImageComments/" + imageID, function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr2 index " + index + " value " + value);
                    $.each(value, function (index, value) {
                        console.log("Nr index " + index + " value " + value);
                        if (index === "comment") {
                            console.log("comment found " + value);
                            $("#responseDIV").append("<p>" + value + "</p><br>");
                        }
                        else if (index === "user") {
                            console.log("User found " + index);
                            $("#responseDIV").append("<p>" + value + "</p><br>");
                        }
                        else if (index === "time") {
                            console.log("Time found " + index);
                            $("#responseDIV").append("<p>" + value + "</p><br>");
                        }
                    });
                });
            });
        });
    }

    function favouriteImage(imageID) {
        console.log("Favouriting image(in function) " + imageID);
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/favouriteImage/" + imageID + "/6",
            dataType: "text",
            success: function (response) {
                alert("Last " + response);
                $("#response").append(response);
            }
        });
    }

    function unfavouriteImage(imageID, username) {
        console.log("Unfavouriting image(in function) " + imageID + " user " + username);
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/unfavouriteImage/" + imageID + "/" + username,
            dataType: "text",
            success: function (response) {
                alert("Last " + response);
                $("#response").append(response);
            }
        });
    }

    function findRandomImage() {
        $.getJSON("http://192.168.56.1:8080/ImageRekt/webresources/generic/findRandomImage", function (data) {
            $.each(data, function (index, value) {
                console.log("index " + index + " value " + value);
                $.each(value, function (index, value) {
                    console.log("Nr2 index " + index + " value " + value);
                    if (index === "title") {
                        console.log("this is the compare for image " + index.localeCompare("title"));
                        console.log("image found " + index);
                        $("#responseDIV").append("<p>" + value + "</p><br>");
                    }
                    else if (index === "path") {
                        console.log("Title found " + index);
                        $("#responseDIV").append("<img src='http://192.168.56.1/test/" + value + "' width='100px' height='100px'><br>");
                    }
                    else if (index === "iid") {
                        console.log("IID found " + index);
                    }
                });
            });
        });
    }
});