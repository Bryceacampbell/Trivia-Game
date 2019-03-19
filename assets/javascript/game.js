$(document).ready(function () {

    var questions = [
        {
            question: "In Ocarina of Time, who is the Sage of Light?",
            choice: ["Zelda", "Link", "Sheik", "Rauru"],
            answer: 3,
            image: "assets/images/rauru.png"
        },
        {
            question: "Who is the main villain in Skyward Sword?",
            choice: ["Phi", "Vaati", "Ghirahim", "Gannon"],
            answer: 2,
            image: "assets/images/ghirahim.png"
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
            image: "assets/images/link.png"
        },
        {
            question: "What is the name of the leader of the Bomber's in Majora's Mask?",
            choice: ["Jim", "Ivan", "Jun-Roberto", "Kafei"],
            answer: 0,
            image: "assets/images/jim.png"
        },
    ];

    var correctAnswerCounter = 0;
    var wrongAnswerCounter = 0;
    var unansweredCounter = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var questionCounter = questions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset-game").hide();

    //click start button to start game
    $("#start-game").on("click", function () {
        $("#start-game").hide();
        questionsDisplay();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    //randomly pick question in array 
    //display question and loop though and display possible answers
    function questionsDisplay() {

        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];

        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");

        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<button>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }

        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {

            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctAnswerCounter++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongAnswerCounter++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }

    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unansweredCounter++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.image + ">");
        newArray.push(pick);
        questions.splice(index, 1);

        hideimg = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongAnswerCounter + correctAnswerCounter + unansweredCounter) === questionCounter) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctAnswerCounter + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongAnswerCounter + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCounter + "</h4>");
                $("#reset-game").show();
                correctAnswerCounter = 0;
                wrongAnswerCounter = 0;
                unansweredCounter = 0;

            } else {
                runTimer();
                questionsDisplay();
            }
        }, 3000);
    }

    $("#reset-game").on("click", function () {
        $("#reset-game").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        questionsDisplay();
    })
})