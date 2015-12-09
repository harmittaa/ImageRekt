$(document).ready(function() {
var myID=0;
var PID=0;


//Go through images
function loop(){
for(var i=0; i<5; i++){
	myID ++;
	PID ++;

	//Create placeholder spaces for images and text fields
	$('#sdiv').append('<img id=' + myID + ' src="" height="300" width="300" >');
	$('#sdiv').append('<p id='+PID+'>""</p>');
	
	
	//Draw images into their places
	$('#' + myID).attr("src", "boxing.jpg");


	//attribute textfield for image
	$('#' + myID).text("KUVA-ATTRIBUUTTI");

	$('#' + PID).css( {paddingLeft : "0px", paddingRight : "10px", paddingBottom: "4px"  } );

	//Image hyperlink to imagePage.html
	$('#' + myID).wrap('<a href="file:///Users/Juhani/Desktop/html&js/imagePage.html"></a>');

	sessionStorage.setItem('kuva', $('#' + myID).attr("src", "boxing.jpg"));
	
}
}

function centerize(){
	$('#sdiv').css({"text-align": "center"});
}

loop();
centerize();


$('#signup').click(function() {
   window.location = "file:///Users/Juhani/Desktop/html&js/signupPage.html";
});

$('#profile').click(function(){
	window.location = "file:///Users/Juhani/Desktop/html&js/myProfilePage.html";
});


});