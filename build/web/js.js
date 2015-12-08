/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var username = "";
    var imageID = 123456;
    var tagID = 123456;
    var tagContent = "";

    $("#namecheck").change(function () {
        username = $("#namecheck").val();
        checkUsername(username);

    });

    $("#ratingcheck").change(function () {
        imageID = $("#ratingcheck").val();
        checkRating(imageID);
    });

    $("#findImgByTag").change(function () {
        // first find tid by tag content
        console.log("start");
        tagContent = $("#findImgByTag").val();
        console.log("tagContent is " + tagContent);
        findTID(tagContent);

    });

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
    
    function findImgByTag(tid) {
        console.log("tag id in last " + tagID);
        $.ajax({
            type: "GET",
            url: "http://192.168.56.1:8080/ImageRekt/webresources/generic/findImageByTag/" + tid,
            dataType: "text",
            success: function (response) {
                alert("Last " + response);
                $("#response").append(response);
            }
        });
        
    }
});