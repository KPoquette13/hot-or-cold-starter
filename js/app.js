//Number of attempted guesses
var numTry;
//Chosen number
var randNum;
var prevDiff = 0;

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
  	prevDiff = 0;
  	$("#count").text(numTry);
  	//Choose new number
  	randNum = chooseNum();
  	//Reset displayed values to original
  	$("#userGuess").val('');
  	$("#feedback").text("Make your Guess!");
  	$("#prevFeedback").text("");
  	//Clear the list of guesses
  	$('#guessList').empty();
}

function checkPrevGuess(diff){
	if(prevDiff > diff){
		return "Getting Warmer!";
	} else if(prevDiff === diff){
		return "Same Temp";
	}
	return "Getting Colder...";
}

function checkGuess(guess){
	//Calculate difference between input and number
	var diff = Math.abs(guess - randNum);
	var feedback;
	var prevFeedback;
	//Give feedback based on difference
	if(diff === 0){
		feedback = "Correct!";
	} else if(diff >= 1 && diff <= 10) {
		feedback = "Very Hot!";
	} else if(diff >= 11 && diff <= 20) {
		feedback = "Hot!";
	} else if(diff >= 21 && diff <= 30) {
		feedback = "Warm";
	} else if(diff >= 31 && diff <= 50) {
		feedback = "Cold";
	} else if(diff >= 51) {
		feedback = "Ice Cold!";
	} else {
		feedback = "An error has occured, reload page";
	}

	if(prevDiff !== 0){
		if(diff !== 0){
			prevFeedback = checkPrevGuess(diff);
			$("#prevFeedback").text(prevFeedback);
		} else {
			$("#prevFeedback").text("Congratulations!");
		}	
	}

	$("#feedback").text(feedback);
	//Increase the number of tries and show this
	numTry = numTry + 1;
	$("#count").text(numTry);

	//Add the guess to the guess list
	var guessItem = "<li>" + guess + "</li>";
	$("#guessList").append(guessItem);
	prevDiff = diff;
 }

//Check for valid input
 function validInput(input){
 	var decCheck;
 	var rangeCheck;

 	//Make sure there is an numeric value
 	var numCheck = parseInt(input, 10);

 	//Make sure there are no decimal points
 	if(input.indexOf(".") !== -1){
 		decCheck = false;
 	} else {
 		decCheck = true;
 	}

 	//Make sure number is within range
 	if(input > 0 && input <= 100){
 		rangeCheck = true;
 	} else {
 		rangeCheck = false;
 	}

 	if(decCheck && numCheck && rangeCheck){
 		return true;
 	}
 	
 	return false;
 }

$(document).ready(function () {
	
	//Set up game
	newGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	// Reset the game
  	$(".new").click(function(){
  		newGame();
  	});

  	//Guess button clicked
  	$("form").submit(function (e) {
  		//stop page from reloading
  		e.preventDefault();
  		//Check for valid input
  		var userGuess = $("#userGuess").val();
  		var validGuess = validInput(userGuess);
  		if(!validGuess){
  			$("#feedback").text("Enter a number between 1-100");
  		} else {
  			checkGuess(parseInt($("#userGuess").val(), 10));
  		}
  	});



});