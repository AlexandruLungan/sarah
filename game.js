(function () {
  //Create a block path messages for each position
  var blockedPathMessages = [];
  blockedPathMessages[0] = "C'est trop dangereux de se déplacer par là.";
  blockedPathMessages[1] = "Une force mystérieuse te retient.";
  blockedPathMessages[2] = "Un enchevêtrement d'épines bloque ton chemin.";
  blockedPathMessages[3] = "Tu ne peux pas passer dessus le dragon.";
  blockedPathMessages[4] = "";
  blockedPathMessages[5] = "La porte est fermée.";
  blockedPathMessages[6] = "La rivière est trop profonde pour être traversée.";
  blockedPathMessages[7] = "Les arbres sont trop épais pour passer.";
  blockedPathMessages[8] = "Tu as trop peur d'aller par là.";

  //Create img map
  var images = [];
  images[0] = "keep.png";
  images[1] = "well.png";
  images[2] = "glade.png";
  images[3] = "dragon.png";
  images[4] = "path.png";
  images[5] = "gate.png";
  images[6] = "river.png";
  images[7] = "bench.png";
  images[8] = "cottage.png";
  images[9] = "sarah.png";

  //Create the map
  var map = [];
  map[0] = "Un vieux château de pierre.";
  map[1] = "Un puits profond.";
  map[2] = "Une clairière ensoleillée.";
  map[3] = "Un dragon endormi.";
  map[4] = "Un chemin étroit.";
  map[5] = "Une ancienne porte.";
  map[6] = "Le bord d'une rivière.";
  map[7] = "Un banc en bois solitaire.";
  map[8] = "Un cottage isolé. Une faible musique vient de l'intérieur.";

  //Set the player starting location
  var mapLocation = 4;

  //Create an array Help messages
  var helpMessages = [];
  helpMessages[0] = "";
  helpMessages[1] =
    "Je me demande si tu pourrais utiliser quelque chose pour savoir à quelle profondeur " +
    " est le puits?";
  helpMessages[2] = "";
  helpMessages[3] =
    "Peut-être que si tu avais l'épée, tu pourrais tuer le dragon ?";
  helpMessages[4] = "";
  helpMessages[5] = "";
  helpMessages[6] = "";
  helpMessages[7] = "";
  helpMessages[8] = "Cela semble être une belle pièce pour la musique.";

  //Initialize the backpack
  var backpack = [];

  //Initialize the player input
  var playersInput = "";

  //Initialize the gameMessage
  var gameMessage = "<br>Bienvenue dans la forêt de Sarah ! ";
  gameMessage += "Essayez l'un de ces mots : ";
  gameMessage += "nord, est, sud, west, prendre, tomber, ";
  gameMessage += "utiliser, pierre, flute, epee, aide.";

  //Create an array of items and location of them
  var items = ["pierre"];
  var itemLocation = [6];

  var itemsIKnow = ["flute", "pierre", "epee"];
  var item = "";

  //Create an array of actions the game understand
  //and the variable set the current actions
  var actionsIKnow = [
    "nord",
    "west",
    "sud",
    "est",
    "aide",
    "prendre",
    "utiliser",
    "tomber",
  ];
  var action = "";

  //The output and input element
  var output = document.querySelector("#output");
  var input = document.querySelector("#input");

  //The image element
  var image = document.querySelector("img");

  //The button
  var button = document.querySelector("#button");
  button.style.cursor = "pointer";
  button.addEventListener("click", clickHandler, false);
  button.addEventListener("mousedown", mousedownHandler, false);
  button.addEventListener("mouseout", mouseoutHandler, false);

  //Listen for enter key presses
  window.addEventListener("keydown", keydownHandler, false);

  //Display the player location
  render();

  function mousedownHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
    button.style.background =
      "linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
  }

  function mouseoutHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  }

  function clickHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";

    playGame();
  }

  function keydownHandler(event) {
    if (event.code === "Enter") {
      playGame();
    }
  }
  function playGame() {
    //Get the player's input and convert it to lowercase
    playersInput = input.value;
    playersInput = playersInput.toLowerCase();

    //Reset the value from the previous turn
    gameMessage = "";
    action = "";

    //Figure out the player's action
    for (i = 0; i < actionsIKnow.length; i++) {
      if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
        action = actionsIKnow[i];
        console.log("player's action: " + action);
        break;
      }
    }

    //Figure out the item the player wants
    for (i = 0; i < itemsIKnow.length; i++) {
      if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
        item = itemsIKnow[i];
        console.log("player's item: " + item);
      }
    }

    //Choose the corect action
    switch (action) {
      case "nord":
        if (mapLocation >= 3) {
          mapLocation -= 3;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "west":
        if (mapLocation % 3 != 2) {
          mapLocation += 1;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "sud":
        if (mapLocation < 6) {
          mapLocation += 3;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "est":
        if (mapLocation % 3 != 0) {
          mapLocation -= 1;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "aide":
        //Display a hint if there is one at this location
        if (helpMessages[mapLocation] !== "") {
          gameMessage = helpMessages[mapLocation];
        }
        gameMessage += "Essayez l'un de ces mots : ";
        gameMessage += "nord, est, sud, west, prendre, tomber, ";
        gameMessage += "utiliser, pierre, flute, epee.";
        break;

      case "tomber":
        dropItem();
        break;
      case "prendre":
        takeItem();
        break;
      case "utiliser":
        useItem();
        break;
      default:
        gameMessage = "Je ne comprends pas...";
    }
    //Render the game
    render();
  }
  //Taking items
  function takeItem() {
    //Find the index number of the item in the items array
    var itemIndexNumber = items.indexOf(item);

    //Does the item exist in the game world
    //and is it at the player's current location?
    if (
      itemIndexNumber !== -1 &&
      itemLocation[itemIndexNumber] === mapLocation
    ) {
      gameMessage = "Tu prends le " + item + ".";

      //Add the item to the player's backpack
      backpack.push(item);

      //Remove the item from the game world
      items.splice(itemIndexNumber, 1);
      itemLocation.splice(itemIndexNumber, 1);

      //Display in the console for testing
      console.log("Objets du monde: " + items);
      console.log("des articles de sac à dos: " + backpack);
    } else {
      //Message if you try and take an item
      //that isn't in the current location
      gameMessage = "Tu ne peux pas faire ça.";
    }
  }

  function dropItem() {
    //Try to drop-off the item only if the backpack isn't empty
    if (backpack.length !== 0) {
      //Find the item's array index number in the backpack
      var backpackIndexNumber = backpack.indexOf(item);

      //The item is in the backpack if backpack index number is not -1
      if (backpackIndexNumber !== -1) {
        //Tell the player that the items has been drop
        gameMessage = "Tu as laissé tomber le " + item + ".";

        //Add the item from backpack to the game world
        items.push(backpack[backpackIndexNumber]);
        itemLocation.push(mapLocation);

        //Remove the item from the player's backpack
        backpack.splice(backpackIndexNumber, 1);
      } else {
        //Message if the player try to drop something that is not in the backpack
        gameMessage = "Tu ne peux pas faire ça.";
      }
    } else {
      gameMessage = "Tu ne portes rien !";
    }
  }

  function useItem() {
    //1.Find out if the item is in the backpack

    //Find the itemsArray index number in the backpack
    var backpackIndexNumber = backpack.indexOf(item);

    //If the index number is -1 then it isn't in the backpack
    //Tell the player that he is not carrying it
    if (backpackIndexNumber === -1) {
      gameMessage = "Tu ne le portes pas.";
    }

    //If there are no items tell the player that the backpack is empty
    if (backpack.length === 0) {
      gameMessage += "Votre sac à dos est vide.";
    }

    //2.It the item is found in the backpack
    //figure what to do with it

    if (backpackIndexNumber !== -1) {
      switch (item) {
        case "flute":
          if (mapLocation === 8) {
            gameMessage = "Une belle musique remplit l'air. ";
            gameMessage += "Un vieil homme spirituel sort  ";
            gameMessage += "et te donne une epee.";

            //Add the epee to the world
            items.push("epee");
            itemLocation.push(mapLocation);
            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "Tu essaies de jouer la flûte ";
            gameMessage += "mais ça ne fait pas de son ici.";
          }
          break;
        case "epee":
          if (mapLocation === 3) {
            gameMessage =
              "J'aime ton sourire, ton odeur, tes bonds en courant,";
            gameMessage += " ton toucher, ta passion... Avec amour, Alexandru";
            images[3] = "sarah.jpg";

            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "Vous balancez l'épée dans le vide..";
          }
          break;
        case "pierre":
          if (mapLocation === 1) {
            gameMessage = "Vous laissez tomber la pierre dans le puits";
            gameMessage = " Une flute magique apparaît !";

            //Remove the item from players backpack
            backpack.splice(backpackIndexNumber, 1);

            //Add the flute to the game World
            items.push("flute");
            itemLocation.push(mapLocation);

            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "Tu tâtonnez avec la pierre dans la poche.";
          }
          break;
      }
    }
  }
  //Function render
  function render() {
    output.innerHTML = map[mapLocation];
    image.src = "images/" + images[mapLocation];

    //Display an item if there's one in this location
    //1. Loop through all the game items
    for (i = 0; i < items.length; i++) {
      //find out if there is an item in this location
      if (mapLocation === itemLocation[i]) {
        //Display it
        output.innerHTML = "Tu vois un <strong>" + items[i] + "</strong> ici.";
      }
    }

    //Display the backpack content
    if (backpack.length !== 0) {
      output.innerHTML += "<br>Tu portes : " + backpack.join(", ");
    }
    //Display the game message
    output.innerHTML += "<br><em>" + gameMessage + "</em>";

    //Clear the input field
    input.value = "";
  }

  function endGame() {
    image.src = "images/sarah.png";
  }
})();
