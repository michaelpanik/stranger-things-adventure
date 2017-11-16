var Model = (function() {
  var db = {
    rooms: {
      1: { // START
        text: "The door clicks shut behind you. The dark hall stretches out before you. You have a gun, a flashlight, and your walkie talkie.",
        options: [
          { text: "Go north.", dest: 2 }
        ]
      },
      2: {
        text: "You are at the east end of an east/west hallway.",
        options: [
          { text: "Go east.", dest: 3 },
          { text: "Go west.", dest: 1 }
        ]
      },
      3: {
        text: "The hall continues to the west.",
        options: [
          { text: "Go east.", dest: 4 },
          { text: "Go west.", dest: 2 }
        ]
      },
      4: {
        text: "The hall continues to the west.",
        options: [
          { text: "Go east.", dest: 5 },
          { text: "Go west.", dest: 3 }
        ]
      },
      5: {
        text: "You are at the end of a long, north/south hallway with some doors and corridors. The bodies of dead lab workers litter the floor.",
        options: [
          { text: "Go north.", dest: 6 },
          { text: "Go west.", dest: 4 }
        ]
      },
      6: {
        text: "The hall continues north.",
        options: [
          { text: "Go north.", dest: 7 },
          { text: "Go south.", dest: 5 }
        ]
      },
      7: {
        text: "The hall continues north. There seems to be a closet to the east.",
        options: [
          { text: "Go north.", dest: 9 },
          { text: "Enter closet.", dest: 8 },
          { text: "Go south.", dest: 6 }
        ]
      },
      8: {
        text: "You are in a supply closet. It looks ransacked, save for a few scraps of paper.",
        options: [
          { text: "Examine the paper.", dest: 8.1 },
          { text: "Exit closet.", dest: 7 }
        ]
      },
      8.1: { // Getting the first power code.
        text: "The paper is damaged. What remains reads: \"Power code (3/3): ELEVEN\"",
        options: [
          { text: "Store the paper.", dest: 8 },
          { text: "Exit closet.", dest: 7 }
        ]
      },
      9: {
        text: "The hall continues north.",
        options: [
          { text: "Go north.", dest: 10 },
          { text: "Go south.", dest: 7 }
        ]
      },
      10: {
        text: "You are at a split; a hall to the north and one to the east. The east corridor is pitch black and gives you a terribly uneasy feeling.",
        options: [
          { text: "Go north.", dest: 11 },
          { text: "Go east.", dest: 36 },
          { text: "Go south.", dest: 9 }
        ]
      },
      11: {
        text: "The hall continues north. In the hand of a dead lab assistant, you can see some ammunition.", //There's some ammunition on the ground.
        options: [
          { text: "Go north.", dest: 12 },
          { text: "Get ammo.", dest: 11.1 },
          { text: "Go south.", dest: 10 }
        ]
      },
      11.1: {
        text: "Ammo taken.", //Ammo
        options: [
          { text: "Go north.", dest: 12 },
          { text: "Go south.", dest: 10 }
        ]
      },
      12: {
        text: "The hall continues north.",
        options: [
          { text: "Go north.", dest: 13 },
          { text: "Go south.", dest: 11 }
        ]
      },
      13: {
        text: "You're at the north end of the long hallway. There is a stairwell to the east.",
        options: [
          { text: "Go west.", dest: 14 },
          { text: "Go south.", dest: 12 }
        ]
      },
      14: {
        text: "The stairwell, upstairs. A smear of blood appears down the full flight of stairs. There's a closet to your right.",
        options: [
          { text: "Go downstairs.", dest: 20 },
          { text: "Enter closet.", dest: 20 },
          { text: "Go east.", dest: 13 }
        ]
      },
      15: {
        text: "A supply closet. A lone medicine bottle on the shelf reads \"Jane\", and the rest is blacked out.",
        options: [
          { text: "Exit closet.", dest: 14 }
        ]
      },
      20: { //DOWNSTAIRS
        text: "The stairwell, downstairs. The air is pungent. It appears there is no radio signal here.",
        options: [
          { text: "Go north.", dest: 19 }
        ]
      },
      19: {
        text: "The hall continues east and west.",
        options: [
          { text: "Go east.", dest: 18 },
          { text: "Go west.", dest: 21 }
        ]
      },
      18: {
        text: "Operating Wing. The sign on the wall reads \"Area Restricted\"",
        options: [
          { text: "Go north.", dest: 17 },
        ]
      },
      17: {
        text: "The hall turns to the east. Something's not right.",
        options: [
          { text: "Go north.", dest: 16 },
        ]
      },
      16: {
        text: "The hall continues north. Your radio crackles, and then...nothing.",
        options: [
          { text: "Go north.", dest: 29 },
        ]
      },
      29: {
        text: "A scientist lays dead on the ground. He's holding a piece of paper.",
        options: [
          { text: "Go north.", dest: 30 },
          { text: "Take paper.", dest: 29.1 },
        ]
      },
      29.1: {
        text: "It appears to be a lab report full of jargon.",
        options: [
          { text: "Discard the paper.", dest: 29 }
        ]
      },
      30: {
        text: "The hall turns to the west.",
        options: [
          { text: "Go west.", dest: 32 }
        ]
      },
      32: {
        text: "A Demadog jumps from around the corner, snarling!",
        options: [
          { text: "Go west.", dest: 35 },
          { text: "Go west.", dest: 33 }
        ]
      },
      33: {
        text: "The Operating Room. Amidst the bloody instruments and bodies left by the demadog, there is a lone notepad.",
        options: [
          { text: "Examine the notepad.", dest: 33.1 }
          { text: "Exit south.", dest: 33 }
        ]
      },
      33.1: {
        text: "It's largely empty. The remains of one page reads, \"...Power code (1/3): COG. Crypt...",
        options: [
          { text: "Store the paper.", dest: 33 }
        ]
      },
      35: {
        text: "It's largely empty. The remains of one page reads, \"...Power code (1/3): COG. Crypt...",
        options: [
          { text: "Store the paper.", dest: 33 }
        ]
      },
    }
  }

  var currentRoom = 8,
      currentOptions = function() {
        return db['rooms'][currentRoom]['options']
      }

  function setRoom(newRoom) {
    currentRoom = newRoom
  }

  function getRoom() {
    return currentRoom;
  };

  return {
    db: db,
    currentRoom: getRoom,
    updateRoom: setRoom,
    currentOptions: currentOptions
  };
})();

var View = (function() { //VIEW LAYER
  // Aaaalrighty let's cache this DOM
  var $console = $('#console'),
      $description = $console.find('.description'),
      $options = $console.find('.options')

  // Aaaand let's create some functions
  function updateDescription(roomNum) { // Show the description text for the room
    $description.text(Model.db.rooms[roomNum].text)
  }

  function updateOptions(roomNum) { // Show the options for the room
    var newOptions = []

    for (var option in Model.db.rooms[roomNum].options) { // Loop through the options
      newOptions.push('<li>' + Model.db.rooms[roomNum].options[option].text + '</li>') // Add to array with HTML tags (easier to populate UL later)
    }

    $options.html(newOptions.join('')) //So then join them as a string, but add as HTML
    $options.children('li:first-child').addClass('active');
  }

  function movePointer(selection) {
    $options.children().removeClass('active');
    $options.children().eq(selection-1).addClass('active'); // So find the options child at index of selection, minus one (because selection starts at 1, because .length)
  }

  function updateScreen() { // Why not handle this all at once? So later when we select a room, we just update screen with the room we selected. Simple!
    updateDescription(Model.currentRoom())
    updateOptions(Model.currentRoom())
  }

  return {
    updateScreen: updateScreen,
    movePointer: movePointer
  }
})();

var Controller = (function() { //CONTROLLER LAYER
  var selection = 1; //Current selection for current options. FUTURE should this be moved to Model? Would add a lot of code: dec/inc functions to Model

  function init() {
    keyListener()
  }

  function keyListener() { //FUTURE is this abstraction overkill? Is there benefit to Listen/Handler on key events?
    window.onkeyup = function(e) {
      keyHandler(e)
    }
  }

  function keyHandler(e) {
    var key = e.keyCode ? e.keyCode : e.which; // Does the event have a keycode? Use it! Otherwise, hope for a "which" component

    switch(key) {
      case 38: // Up arrow
        selector('up')
        break;
      case 40: // Down arrow
        selector('down')
        break;
      case 13: // Enter
        makeSelection()
        break;
    }
  }

  function selector(dir) { // Manually increment through the current options. FUTURE further abstraction?
    var length = Model.currentOptions().length; //FUTURE could add 'length' as arg and then return info?
    if (length > 1) {
      if (dir == 'down') {          // If down
        if (selection >= length) {  // make sure we're not past the last item
            selection = 1           // if we are, set selection back to 1, rather than one more than there is
        } else {                    // if not
            selection++             // increment selection
        }
      } else if (dir == 'up') {     // If up
        if (selection <= 1) {       // make sure we're not before the first item
            selection = length      // set selection to the last element
        } else {                    // if we're not
            --selection             // decrement the selection
        }
      }

      View.movePointer(selection)
    } else {
      selection = 1
    }
  }

  function makeSelection() {
    var currentOptions = Model.currentOptions(),
        dest = currentOptions[selection-1].dest

    Model.updateRoom(dest)
    View.updateScreen()
    selection = 1;
  }

  init() // init function - start the controller in the proper order
})();

View.updateScreen() //TEMPORARY need a better app start method
