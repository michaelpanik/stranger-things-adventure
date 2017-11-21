function Model() {
  var status = {
    alive: true,
    ammo: 1,
    power: false,
    dogAlive: {
      dog1: true,
      dog2: true,
      dog3: true,
      dog4: true,
      dog5: true
    }
  }

  var images = [
      './img/hallway1.png',   // 0
      './img/hallway2.png',   // 1
      './img/hallway3.png',   // 2
      './img/monitor.png',    // 3
      './img/powerRoom.png',  // 4
      './img/eaten.png'       // 5
  ]

  var rooms = {
      1: { // START
        text: "The door clicks shut behind you. The dark hall stretches out before you. You have a gun, a flashlight, and your walkie talkie.",
        image: 1,
        options: [
          { text: "Go north.", dest: 2 }
        ]
      },
      2: {
        text: "You are at the east end of an east/west hallway.",
        image: 2,
        options: [
          { text: "Go east.", dest: 3 },
        ]
      },
      3: {
        text: "The hall continues to the west.",
        image: 3,
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
          { text: "Get ammo.", dest: 11.1, action: "getAmmo" },
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
          { text: "Go east.", dest: 14 },
          { text: "Go south.", dest: 12 }
        ]
      },
      14: {
        text: "The stairwell, upstairs. A smear of blood appears down the full flight of stairs. There's a closet to your right.",
        options: [
          { text: "Go downstairs.", dest: 20 },
          { text: "Enter closet.", dest: 15 },
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
          { text: "Go north.", dest: 19 },
          { text: "Go upstairs.", dest: 14 }
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
          { text: "Go west.", dest: 19 }
        ]
      },
      17: {
        text: "The hall turns to the east. Something's not right.",
        options: [
          { text: "Go east.", dest: 16 },
          { text: "Go south.", dest: 18 }
        ]
      },
      16: {
        text: "The hall continues north. Your radio crackles, and then...nothing.",
        options: [
          { text: "Go north.", dest: 29 },
          { text: "Go west.", dest: 17 }
        ]
      },
      29: {
        text: "A scientist lays dead on the ground. He's holding a piece of paper.",
        options: [
          { text: "Go north.", dest: 30 },
          { text: "Go south.", dest: 16 },
          { text: "Take paper.", dest: 29.1 }
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
          { text: "Go west.", dest: 32 },
          { text: "Go south.", dest: 29 }
        ]
      },
      32: function(){
          if (status.dogAlive.dog2 == true) {
            return {
                      text: "A Demadog jumps from around the corner, snarling!",
                      options: [
                        { text: "Shoot!", action: "shoot", dog: 2 }, //shoot()
                        { text: "Run away!", action: "run", ret: 30 } //runAway($destinationNumber);
                      ]
                    }
          } else {
            return {
                      text: "The remains of a Demadog lay strewn across the hall.",
                      options: [
                        { text: "Go north.", dest: 33 },
                        { text: "Go east.", dest: 31 },
                        { text: "Go west.", dest: 35 }
                      ]
                    }
          }
      },
      33: {
        text: "The Operating Room. Amidst the bloody instruments and bodies left by the demadog, there is a lone notepad.",
        options: [
          { text: "Examine the notepad.", dest: 33.1 },
          { text: "Exit south.", dest: 32 }
        ]
      },
      33.1: {
        text: "It's largely empty. The remains of one page reads, \"...Power code (1/3): COG. Crypt...",
        options: [
          { text: "Store the paper.", dest: 33 }
        ]
      },
      21: {
        text: "The hall runs east to west.",
        options: [
          { text: "Go east.", dest: 19 },
          { text: "Go east.", dest: 22 }
        ]
      },
      22: {
        text: "You're at the end of the east/west hall. There's a closet.",
        options: [
          { text: "Enter supply closet.", dest: 23 },
          { text: "Go east.", dest: 21 },
          { text: "Go south.", dest: 24 }
        ]
      },
      23: {
        text: "A supply closet. There's some ammo here.",
        options: [
          { text: "Take ammo.", dest: 23.1, action: "getAmmo" },
          { text: "Exit closet.", dest: 22 }
        ]
      },
      23.1: {
        text: "Ammo taken.", //Ammo
        options: [
          { text: "Exit closet.", dest: 22 }
        ]
      },
      24: (function(){
          if (status.dogAlive.dog1 == true) {
            return {
                      text: "A Demadog charges you!",
                      options: [
                        { text: "Shoot!", action: "shoot", dog: 1 }, //shoot()
                        { text: "Run away!", action: "run" } //runAway($destinationNumber);
                      ]
                    }
          } else {
            return {
                      text: "The remains of a Demadog lay strewn across the hall.",
                      options: [
                        { text: "Go north.", dest: 23 },
                        { text: "Go south.", dest: 26 },
                        { text: "Go west.", dest: 25 }
                      ]
                    }
          }
      })(),
      25: {
        text: "The Power Room. The walls are covered with switches and knobs. A computer terminal on battery backup is prompting for the power code.",
        options: [
          { text: "Enter code.", action: "enterCode" },
          { text: "Go back.", dest: 24 }
        ]
      },
      26: {
        text: "The end of a north/south hall. There's a closet on your right.",
        options: [
          { text: "Enter the closet.", dest: 28 },
          { text: "Go north.", dest: 24 }
        ]
      },
      28: {
        text: "A supply closet. It looks relatively untouched by the chaos. You find a spiral notebook.",
        options: [
          { text: "Read the notebook.", dest: 28.1 },
          { text: "Exit the closet.", dest: 26 }
        ]
      },
      28.1: {
        text: "\"I have a feeling that what I do here isn't what I believe it to be. The screams of agony I sometimes hear can't be from unhealthy, unhappy children. I'm afraid it's much worse. Much much worse.\"",
        options: [
          { text: "Exit the closet.", dest: 26 }
        ]
      },
    }

  var currentRoom = 1,
      currentOptions = function() {
        return rooms[currentRoom]['options']
      }

  function setRoom(newRoom) {
    currentRoom = newRoom
  }

  function getRoom() {
    return currentRoom;
  }

  function newAmmo() {
    ++status.ammo
  }

  function useAmmo() {
    --status.ammo
  }

  function getAmmo() {
    return status.ammo
  }

  function killDog(n, callback) {
    status['dogAlive']['dog'+n] = false
    alert(status['dogAlive']['dog'+n])
    callback()
  }

  return {
    rooms: rooms,
    images: images,
    currentRoom: getRoom,
    updateRoom: setRoom,
    currentOptions: currentOptions,
    getAmmo: getAmmo,
    useAmmo: useAmmo,
    killDog: killDog
  };
}

function View(Model) { //VIEW LAYER
  // Aaaalrighty let's cache this DOM
  var $console = $('#console'),
      $description = $console.find('.description'),
      $options = $console.find('.options'),
      $images = $console.find('#graphic')

  function init() {
    imagePreloader()
  }

  function imagePreloader() {
    var images = []

    for (i=0;i<Model.images.length;i++){
      images[i] = new Image()
      images[i].src = Model.images[i]
    }
  }

  // Aaaand let's create some functions
  function updateDescription(roomNum) { // Show the description text for the room
    $description.text(Model.rooms[roomNum].text)
  }

  function updateOptions(roomNum) { // Show the options for the room
    var newOptions = []

    for (var option in Model.rooms[roomNum].options) { // Loop through the options
      newOptions.push('<li>' + Model.rooms[roomNum].options[option].text + '</li>') // Add to array with HTML tags (easier to populate UL later)
    }

    $options.html(newOptions.join('')) //So then join them as a string, but add as HTML
    $options.children('li:first-child').addClass('active');
  }

  function updateImage(roomNum) { // Show the image for the room
    var imageNum = Model.rooms[roomNum].image
    $images.attr('src', Model.images[imageNum])
  }

  function movePointer(selection) {
    $options.children().removeClass('active');
    $options.children().eq(selection-1).addClass('active'); // So find the options child at index of selection, minus one (because selection starts at 1, because .length)
  }

  function updateScreen() { // Why not handle this all at once? So later when we select a room, we just update screen with the room we selected. Simple!
    updateDescription(Model.currentRoom())
    updateOptions(Model.currentRoom())
    updateImage(Model.currentRoom())
  }

  return {
    updateScreen: updateScreen,
    movePointer: movePointer
  }

  init()
}

function Controller(View, Model) { //CONTROLLER LAYER
  var selection = 1,
      $console = $('#console'); //Current selection for current options. FUTURE should this be moved to Model? Would add a lot of code: dec/inc functions to Model

  function init() {
    $console.focus()
    keyListener()
    View.updateScreen() //TEMPORARY need a better app start method
  }

  function keyListener() { //FUTURE is this abstraction overkill? Is there benefit to Listen/Handler on key events?
    window.onkeydown = function(e) {
      e.preventDefault()
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
        currentRoom = Model.currentRoom(),
        dest = currentOptions[selection-1].dest,
        action = currentOptions[selection-1].action,
        dog = currentOptions[selection-1].dog,
        ret = currentOptions[selection-1].ret

    if (typeof Model.rooms[currentRoom] === 'function') {
      alert("function!")
    }

    if (dest > 0) {
      newRoom(dest)
    } else {
      if (action == "shoot") {
        shoot(dog);
      } else if (action == "run") {
        runAway(ret);
      } else if (action == "takeAmmo") {
        takeAmmo();
      } else if (action == "enterCode") {
        enterCode();
      }
    }
  }

  function newRoom(dest) {
    Model.updateRoom(dest)
    View.updateScreen()
    selection = 1;
  }

  function playerDie() {
    newRoom(1)
  }

  function shoot(dog) {
    if (Model.getAmmo() >= 1) {
        Model.useAmmo()
        Model.killDog(dog, function() {
          var room = Model.currentRoom()
          newRoom(room)
        })
    } else {
        playerDie()
    }
  }

  function runAway(ret) {
    var n = Math.random();

    if (n < .5) { //Success!
      newRoom(ret)
    } else { //Death!
      playerDie()
    }
  }

  function takeAmmo() {
    Model.newAmmo();
  }

  function enterCode() {
    console.log('code!')
  }

  init()
}

var Model = Model(),
    View  = View(Model),
    Ctrl  = Controller(View, Model);
