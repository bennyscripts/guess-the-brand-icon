var data = JSON.parse(document.getElementById('data').innerHTML);
var icons_folder = "assets/logos/"

var guess_icon = document.getElementById("icon_image");
var guess_input = document.getElementById("guess_input");
var icon_title = document.getElementById("icon_title");

var correct_td = document.getElementById("correct_td");
var incorrect_td = document.getElementById("incorrect_td");
var skipped_td = document.getElementById("skipped_td");

var game_div = document.getElementById("game_div");
var completed_div = document.getElementById("completed_div");
var completed_parag = document.getElementById("completed_parag");

var random_data = data[Math.floor(Math.random() * data.length)];
var random_icon = random_data.logo;
var random_name = random_data.name;

var icons_used = [];
var max_icons = 10;
var score = 0;

var correct = [];
var incorrect = [];
var skipped = []

reset();

guess_input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        guess();
    }
});

function guess() {
    if (guess_input.value == "" || guess_input.value == null) {
        return;
    }

    if (random_name.toLowerCase().includes(guess_input.value.toLowerCase())) {
        score++;
        alert("Correct!");
        correct.push(random_name);
    } else {
        alert("Wrong!");
        incorrect.push(random_name);
    }

    guess_input.value = "";
    next();
}

function skip() {
    skipped.push(random_name);
    next();
} 

function next() {
    
    random_data = data[Math.floor(Math.random() * data.length)];
    random_icon = random_data.logo;
    random_name = random_data.name;

    while (icons_used.includes(random_icon)) {
        random_data = data[Math.floor(Math.random() * data.length)];
        random_icon = random_data.logo;
        random_name = random_data.name;
    }

    icons_used.push(random_icon);

    guess_input.value = "";
    guess_icon.style.backgroundImage = `url(${icons_folder}${random_icon})`;
    icon_title.innerHTML = `Icon ${icons_used.length}/${max_icons}`;

    if (icons_used.length - 1 >= max_icons) {
        complete();
    }
}

function complete() {
    game_div.style.display = "none";
    completed_div.style.display = "block";
    completed_parag.innerHTML = `You scored ${score}`;

    correct_td.innerHTML = correct.join("<br>");
    incorrect_td.innerHTML = incorrect.join("<br>");
    skipped_td.innerHTML = skipped.join("<br>");
}

function reset() {
    icons_used = [];
    score = 0;
    game_div.style.display = "block";
    completed_div.style.display = "none";

    correct = [];
    incorrect = [];
    skipped = []

    next();
}