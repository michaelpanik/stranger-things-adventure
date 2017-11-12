var Model = (function() {
  var db = {
    rooms: [
      {
        text: "You are standing in a dark room.",
        options: [
          { text: "Go forward.", dest: 1 },
          { text: "Go left.", dest: 2 },
          { text: "Go right.", dest: 3 }
        ]
      },
      {
        text: "Forward.",
        options: [
          { text: "Go back.", dest: 0 },
          { text: "Go away.", dest: 4 }
        ]
      },
      {
        text: "Left.",
        options: [
          { text: "Go back.", dest: 0 },
          { text: "Go away.", dest: 4 }
        ]
      },
      {
        text: "Right.",
        options: [
          { text: "Go back.", dest: 0 },
          { text: "Go away.", dest: 4 }
        ]
      },
      {
        text: "You have reached the end!",
        options: [
          { text: "Start over.", dest: 0 }
        ]
      },
    ]
  }

  var currentRoom = 0,
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
