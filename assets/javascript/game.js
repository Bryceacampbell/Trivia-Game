$(document).ready(function () {

    // Array of objects containing questions, choices, correct answer, and image urls
    var questions = [
        {
            question: "In Ocarina of Time, who is the Sage of Light?",
            choice: ["Zelda", "Link", "Sheik", "Rauru"],
            answer: 3,
            image: "assets/images/Rauru.png"
        },
        {
            question: "Who is the main villain in Skyward Sword?",
            choice: ["Phi", "Vaati", "Ghirahim", "Gannon"],
            answer: 2,
            image: "assets/images/Ghirahim.png"
        },
        {
            question: "In what year was Wind Waker first released?",
            choice: ["2001", "2002", "2003", "2004"],
            answer: 1,
            image: "assets/images/wind-waker.jpg"
        },
        {
            question: "In Twilight Princess, where does Link find the Golden Dayflies?",
            choice: ["Zora's Domain and Zora's River", "Kakariko Village and Graveyard", "Hyrule Feild south of Hyrule Castle Town", "Gerudo Desert Mesa"],
            answer: 3,
            image: "assets/images/Link.png"
        },
        {
            question: "What is the name of the leader of the Bomber's in Majora's Mask?",
            choice: ["Jim", "Ivan", "Jun-Roberto", "Kafei"],
            answer: 0,
            image: "assets/images/Jim.png"
        },
    ];

    //global variables - to be used anywhere
    var correctAnswerCounter = 0;
    var wrongAnswerCounter = 0;
    var unansweredCounter = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var questionCounter = questions.length;
    var questionSelected;
    var currentQuestion;
    var finishedQuestionsArray = [];
    var holderArray = [];

    //hide reset button at document on ready
    $("#reset-game").hide();
    $(".container").addClass("container-clear");

    //click start button to start game
    $("#start-game").on("click", function () {
        $("#start-game").hide();
        $(".container").removeClass("container-clear");
        questionsDisplay();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holderArray.push(questions[i]);
        }
    })


    //function to display question and all possible choices
    function questionsDisplay() {

        //math function to choose random question out of questions array
        currentQuestion = Math.floor(Math.random() * questions.length);
        questionSelected = questions[currentQuestion];

        //display selected question
        $("#questionblock").html("<h2>" + questionSelected.question + "</h2>");

        //for loop to display possible choices
        for (var i = 0; i < questionSelected.choice.length; i++) {
            var userChoice = $("<button>");
            userChoice.addClass("answerchoice");
            userChoice.html(questionSelected.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

        //click function to select answer and run outc
        $(".answerchoice").on("click", function () {

            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //if userguess is equal to correct answer, run stop function and
            if (userGuess === questionSelected.answer) {
                stop();
                correctAnswerCounter++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                outcome();  
            } 
            else {
                stop();
                wrongAnswerCounter++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + questionSelected.choice[questionSelected.answer] + "</p>");
                outcome();
            }
        })
    }

    //starts the timer and decrement by 1 every second
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //function to display timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //if timer reaches 0, stop timer
        if (timer === 0) {
            unansweredCounter++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + questionSelected.choice[questionSelected.answer] + "</p>");
            outcome();
        }
    }

    //stop the time
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //function to display images and splice the question selected out of the array so it wont be used again
    function outcome() {
        $("#answerblock").append("<img src=" + questionSelected.image + ">");

        //pushing question selected into a new array
        finishedQuestionsArray.push(questionSelected);

        //splice then removes it out of the inital array 
        questions.splice(currentQuestion, 1);

            setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;
    
            //run the score screen if all questions answered
            if ((wrongAnswerCounter + correctAnswerCounter + unansweredCounter) === questionCounter) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's your results: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctAnswerCounter + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongAnswerCounter + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCounter + "</h4>");
                $("#reset-game").show();
                correctAnswerCounter = 0;
                wrongAnswerCounter = 0;
                unansweredCounter = 0;

            } 
            else {
                runTimer();
                questionsDisplay();
            }
        }, 3000);
    }

    //reset game on click function to reset the game
    $("#reset-game").on("click", function () {
        $("#reset-game").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holderArray.length; i++) {
            questions.push(holderArray[i]);
        }
        runTimer();
        questionsDisplay();
    })
})