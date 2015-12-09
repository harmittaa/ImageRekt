$(document).ready(function() {

/**************************DRAWING IMAGE*************************/
var myID=0;
var PID=0;

function loop(){
for(var i=0; i<5; i++){
	myID ++;
	PID ++;

	//Create placeholder spaces for images and text fields
	$('#picturediv').append('<img id=' + myID + ' src="" width="204" height="154" alt="image">');
	$('#picturediv').append('<p id='+PID+'>"TITLE"</p>');
	
	//Draw images into their places
	$('#' + myID).attr("src", "boxing.jpg");

	//attribute textfield for image
	$('#' + myID).text("KUVA-ATTRIBUUTTI");

	//Image hyperlink to imagePage.html
	$('#' + myID).wrap('<a href="file:///Users/Juhani/Desktop/frontEnd/picturePage.html"></a>');
	
}
}

function centerize(){
	$('#picturediv').css({"text-align": "center"});
}

//loop();	 VAIN OMAT KUVAT NÄKYVIIN!
//centerize();
/**************************DRAWING IMAGE*************************/

/**************************NAVBAR FUNCTIONS*************************/
//LOGO HOMEBUTTON
$('#logo').click(function(){
	window.location = "index.html";
});
//HOME BUTTON
$('#home').click(function(){
	window.location = "index.html";
});

//BUTTON TO MY PROFILE PAGE
$('#myprofile').click(function(){
	window.location = "index.html";
	//TODO: IF NOT LOGGEG IN THEN TO LOG IN PAGE
});

//SEARCH
$('#search').click(function(){
	$('#searchMod').modal('show');
});

//SUBMIT SEARCH
//TODO!!!

//LOGIN MODAL FROM HAMBURGER
$('#login').click(function () {
	$('#logInMod').modal('show');
});

//REGISTER FROM LOG IN
$('#notuser').click(function(){
	$('#signUpMod').modal('show');
});

//LOG IN FROM REGISTER
$('#alreadyuser').click(function(){
	$('#logInMod').modal('show');
});

//LOGIN CHECK FROM LOGIN MODAL TODO: tarkista matchaakö käyttäjänimi ja salasana kannan kanssa! sen jälkeen close loginmod
$('#logincheck').click(function(){

});


//FORGOT PASSWORD
$('#forgotpass').click(function(){
	//$('#loginMod').modal('hide'); HIDING PART FROM HTML
	$('#forgotMod').modal('show');
});

//RETRIEVE PASSWORD
//TODO


//SIGN UP MODAL FROM HAMBURGER
$('#signup').click(function(){
	$('#signUpMod').modal('show');
});

//SING UP CHECK FROM SIGN UP MODAL
$('#signupcheck').click(function(){
var password = $('#password').val();
	var passwordconf = $('#passwordconf').val();
	var length = password.length;

	if (length<1){
		alert("Don't leave it blank!");
		event.preventDefault();
	}

	if(password != passwordconf){
		alert("Passwords don't match!");
		event.preventDefault();
	}

	var username = $('#username').val();
	var email = $('#email').val();

	alert(	"u-name: " + username + 
			"password: " + password + 
			"passwordconf: " +  passwordconf+
			"e-mail: " + email);

});
/**************************NAVBAR FUNCTIONS*************************/


}); //DOCUMENT READY