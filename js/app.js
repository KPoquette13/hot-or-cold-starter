//Number of attempted guesses
var numTry;
var randNum; 

function chooseNum(){
	//Choose random number between 0 and 1 then multiply by 100
  	var num = Math.random() * 100;
  	//Parse the number to an int to remove any decimal places (radix set to 10 for decimal)
  	num = parseInt(num, 10);
  	//Makes num between 1-100 rather than 0-99
  	num = num + 1;

  	return num;
}

function newGame() {
	//Reset number of tries to 0
  	numTry = 0;
  	randNum = chooseNum();
  	//Clear the list of guesses
  	$('#guessList').empty();
}

function checkGuess(guess){
	var diff = Math.abs(guess - randNum);

	if(diff === 0){
		$("#feedback").text("Correct!");
	} else if(diff >= 1 && diff <= 10) {
		$("#feedback").text("Very Hot!");
	} else if(diff >= 11 && diff <= 20) {
		$("#feedback").text("Hot!");
	} else if(diff >= 21 && diff <= 30) {
		$("#feedback").text("Warm");
	} else if(diff >= 31 && diff <= 50) {
		$("#feedback").text("Cold");
	} else if(diff >= 51) {
		$("#feedback").text("Ice Cold!");
	} else {
		$("#feedback").text("An error has occured, reload page");
	}

	numTry = numTry + 1;
	$("#count").text(numTry);
 }

$(document).ready(function () {
	
	newGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$("form").submit(function (e) {
  		e.preventDefault();
  		//Check for valid input
  		//TODO function for validating input
  		var userGuess = $("#userGuess").val();
  		console.log(userGuess);
  		if(!userGuess){
  			$("#feedback").text("Enter a valid number please");
  		} else {
  			checkGuess(parseInt($("#userGuess").val(), 10));
  		}
  	});



});