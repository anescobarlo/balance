 $(document).ready(function memoryGame() {

    //Initialize cards array, the code to make one one card flip at a time
    var cardsName = ["action", "courage", "faith", "happiness", "love", "peace", "action", "courage", "faith", "happiness", "love", "peace"];
    var cardsCode = ["1","1","1","1","1","1","2","2","2","2","2","2"];
    
    //Shuffle cards to initialize game
    cardsName = shuffle(cardsName, cardsCode);

    //Initialize display information
    document.getElementById("matchInfo").innerHTML="To start select any card bellow ↓";
    document.getElementById("attempts").innerHTML="Attempts = 0";

    //Create divs
    var output = "";
    for (i=0; i<=cardsName.length-1; i++) {
        output += ("<div class='flip' id='" + cardsName[i] + cardsCode[i]+ "'>");
        output += ("</div>");
        document.getElementById("memoryCards").innerHTML=output; 
    }
    
    //Initialize variables
    var matches = 0;
    var cardsFlipped = 0;
    var attempts = 0;
    var cardId = new Array();
    var firstCard, secondCard;

    //get the id of the flipped card and check if it's a match
    $(".flip").click (function() {

        cardsFlipped++;

        //remove cardCode to check if it's a match
        cardId[cardsFlipped] = this.id;
        cardId[cardsFlipped] = cardId[cardsFlipped].slice(0, - 1);

        //show card selected
        var img = document.createElement("IMG");
        img.src = "imgs/"+ cardId[cardsFlipped] + ".jpg";
        document.getElementById(this.id).appendChild(img);

        //check if it's the first or second card selected
        if (cardsFlipped == 1) {
            //Capture card id before moving to the second card
            firstCard = this.id; 
        }
        if (cardsFlipped == 2) {
            //Capture id of the second card
            secondCard = this.id; 
            //Check if it's a match and display information
            if (cardId[1] == cardId[2]) {
                document.getElementById("matchInfo").innerHTML="match of " + cardId[1] + " ✓ good job!";
                matches ++;
                attempts ++;
                document.getElementById("attempts").innerHTML="Attempts = " + attempts;
                cardsFlipped = 0;
            }
            else {
                document.getElementById("matchInfo").innerHTML="not a match ✗ keep trying!";
                attempts ++;
                document.getElementById("attempts").innerHTML="Attempts = " + attempts;
                cardsFlipped = 0;
                //Hide cards after 1 second
                setTimeout(function() {
                    document.getElementById(firstCard).innerHTML="";
                    document.getElementById(secondCard).innerHTML="";
                }, 1000);
            }
        }
        //Check if the game is finished
        if (matches == 6) {
            document.getElementById("matchInfo").innerHTML="YOU WON! =D";
            button.value="Play Again";
        }

    });

    //Restart game button
    button.value="Restart Game ↻";
    $("#button").click(function() {
        window.location.reload(true);
    });
  
 });

//shuffle function. from: stackoverflow.com
//swaps each elements with a random element of the array
 function shuffle(array, arrayCode) { 
  var currentIndex = array.length, temporaryValue, randomIndex, temporaryValueCode;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

    temporaryValueCode = arrayCode[currentIndex];
    arrayCode[currentIndex] = arrayCode[randomIndex];
    arrayCode[randomIndex] = temporaryValueCode;
  }

  return array;
}                    