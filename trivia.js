$('#start').on('click', function() {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.btn-success', function(e) {
    game.clicked(e);
})

$(document).on('click', '#reset',function() {
	game.reset();
})

var questions = [{
    question: "When was the moon formed?",
    answers: ["4.6 billion years ago", "10.1 billion years ago", "3 million years ago", "1 million years ago"],
    correctAnswer: "4.6 billion years ago",
    image: "moon.gif"
}, {
    question: "How long does it take the Moon to orbit the Earth?",
    answers: ["25.2 days", "35.7 days", "18 days", "27.3 days"],
    correctAnswer: "27.3 days",
    image: "moon2.gif"
}, {
    question: "Who developed and patented the electrical telegraph in the United States in 1837?",
    answers: ["Galileo Galilei", "Samuel Morse", "Nicolaus Copernicus", "Isaac Newton"],
    correctAnswer: "Samuel Morse",
    image: "samuel.gif"
}, {
    question: "SpaceX was founded by what South African-born inventor?",
    answers: ["Elon Musk", "Mark Zuckerberg", "Stephen Hawking", "Jeff Bezos"],
    correctAnswer: "Elon Musk",
    image: "elon.gif"
}, {
    question: "Which American inventor is generally given credit for the invention of the lightning rod?",
    answers: ["The Wright Brothers", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    correctAnswer: "Benjamin Franklin",
    image: "benjamin.gif"
}, {
    question: "Ancient Greeks believed, the earth to be the centre of the universe. What do we call this model?",
    answers: ["Geocentric Universe", "Heliocentric Universe", "Copernican Model", "Astronomy Model"],
    correctAnswer: "Geocentric Universe",
    image: "geocentric.gif"
}]

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function() {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $('subwrapper').html("<h2 TIME REMAINING <span id='counter'>30</span>Seconds</h2>");
        $('#subwrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="btn btn-success" id ="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button');
        }
    },
    nextQuestion: function() {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
    	clearInterval(timer);
    	game.unanswered++;
    	$('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer+'</h3>');
    	if(game.currentQuestion==questions.length-1) {
    		setTimeout(game.results, 3*1000);
    	} else {
    		setTimeout(game.nextQuestion, 3*1000);
    	}
    },
    results: function() {
    	clearInterval(timer);
    	$('#subwrapper').html("<h2>ALL DONE!</h2>");
    	$('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
    	$('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
    	$('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
    	$('#subwrapper').append("<button id = 'reset'>RESET</button>");
    },
    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function() {
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
            var image = $("<img>").attr("src", game.questions[game.currentQuestion].image).attr("class", "answer-gif") // <img src="https://whatever.com" class="answer-gif" />
            $("#subwrapper").append(image)
        } else {
            var image = $("<img>").attr("src", game.questions[game.currentQuestion].image)
            $("#subwrapper").append(image)
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function() {
        console.log("WRONG");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' +questions[game.currentQuestion].correctAnswer+'</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            var image = $("<img>").attr("src", game.questions[game.currentQuestion].image)
            $("#subwrapper").append(image)
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
    	game.currentQuestion = 0;
    	game.counter = 0;
    	game.correct = 0;
    	game.incorrect = 0;
    	game.unanswered = 0;
    	game.loadQuestion();
    }
}