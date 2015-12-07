/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var username = "";
    var imageID = 123456;

    $("#namecheck").change(function () {
        username = $("#namecheck").val();
        checkUsername(username);

    });

    $("#ratingcheck").change(function () {
        imageID = $("#ratingcheck").val();
        checkRating(imageID);
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
});