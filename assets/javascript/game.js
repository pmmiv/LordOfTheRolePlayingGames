var frodo = {
	"name" : "frodo",
	"health" : 120
}
var gollum = {
	"name" : "gollum",
	"health" : 100,
	"damage" : 5
}
var boromir = {
	"name" : "boromir",
	"health" : 150,
	"damage" : 20
} 
var sauron = {
	"name" : "sauron",
	"health" : 180,
	"damage" : 25
}
var fighters = [frodo, gollum, boromir, sauron];
var heroChosen ;
var enemyChosen ; // maybe not needed? 
var attackCounter = 0;
var frodoDamage ;

function attack () {
	var heroDamage, enemyDamage;
	if (heroChosen === frodo || enemyChosen === frodo) {
		attackCounter++;
		frodoDamage = attackCounter * 8;
		if (heroChosen === frodo) {
			enemyChosen.health = enemyChosen.health - frodoDamage; 
			heroChosen.health = heroChosen.health - enemyChosen.damage;
			heroChosen.damage = frodoDamage;
		} else {
			enemyChosen.health = enemyChosen.health - heroChosen.damage;
			heroChosen.health = heroChosen.health - frodoDamage;
			enemyChosen.damage = frodoDamage;
		}
	console.log(frodoDamage);
	}
	else {
		enemyChosen.health = enemyChosen.health - heroChosen.damage;
		heroChosen.health = heroChosen.health - enemyChosen.damage;
	}
	$(".activeEnemy").text(enemyChosen.name + ": " + enemyChosen.health + " HP");
	$(".hero").text(heroChosen.name + ": " + heroChosen.health + " HP");
	$("#m1").html("<p>"+heroChosen.name+" attacked "+enemyChosen.name+" for "+heroChosen.damage+" damage.</p><p>"+enemyChosen.name+" attacked "+heroChosen.name+" for "+enemyChosen.damage+" damage.</p>");
};


$(document).ready(function(){
	// creates fighter buttons
	for (i = 0; i < fighters.length; i++) {
		var fighterCard = $("<button>");
		fighterCard.addClass("fighter");
		fighterCard.attr("id", fighters[i].name);
		fighterCard.data("data", fighters[i]);
		fighterCard.text(fighters[i].name + ": " + fighters[i].health + " HP");
		fighterCard.css("background-image", "url('assets/images/" + fighters[i].name + ".jpg')");
		$("#bench").append(fighterCard);
	};

	$(".fighter").on("click", function(){
		if (heroChosen === undefined) {
			$(".battleground").append(this);
			$("#m1").html("You selected:");
			$("#m2").html("Excellent Choice.");			
			$("#m3").html("Select your foe.");			
			$(this).addClass("hero");
			heroChosen = $(this).data("data");
		}
		else {
			$(".hero").css("margin-right", "80px");
			$(".battleground").append("<span id='vs'>Versus</span>");
			$(".battleground").append(this);
			$("#m1").html("Begin!");
			$("#m2").html("<button id='action'>Attack!</button>");
			$('#action').click(attack);
			$(this).addClass("activeEnemy");
			$(".activeEnemy").css("margin-left", "80px")
			enemyChosen = $(this).data("data");
			$(".container2").css("display", "none")
		}
	});


	// math for frodo's damage
	// subtract hero damage from enemy health
	// subtract enemy damage from hero health
	// target enemy card and print new hp text
	// if enemy health is <1 and enemies remain set activeEnemy to undefined, and bring $(".container2") back
	// if enemy health is <1 and no enemies remain display win message and change button to reset the game.
	// target hero card and print new hp text
	// do everything done for frodo except hero damage is set in the object

});
