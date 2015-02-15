/*
 * Virtual Pet App with User Interface - Template
 *
 */

'use strict';
// Here's the object oriented model implementation from a previous assignment
// DO NOT MODIFY THIS PART
// Create the pet protoptype
var pet = {
  hungry: true,
  ill: false,
  name: 'Your Pet'
};
pet.feed = function () {
  // The pet is no longer hungry.
  // Return a string indicating that the pet is full. 
  this.hungry = false;
  return this.name + ' is full.';
};
pet.newDay = function () {
  // Set ALL the boolean properties to true.
  // Return 'Good morning!'
  for (var prop in this) {
    if (typeof this[prop] === 'boolean') {
      this[prop] = true;
    }
  }
  return 'Good morning!';
};
pet.check = function () {
  // Check ALL the boolean properties of the pet object.
  // Return true if the pet needs attention.
  // Return false is the pet is fine.
  var result = false;
  for (var prop in this) {
    if (this[prop] === true) {
      result = true;
    }
  }
  return result;
};
// Create the fish prototype. 
var fish = Object.create(pet);
fish.clean = function () {
  // Set the object unhealthy property to false.    
  // Return a string of the form: 'pet name likes the clean tank.'
  this.ill = false;
  return this.name + ' likes the clean tank.';
};
// Create the dog prototype. 
var dog = Object.create(pet);
// initialize the lonely property
dog.lonely = false;
dog.walk = function () {
  // Set the object's unhealthy property to false.
  // Return a string of the form: 'pet name enjoyed the walk!'
  this.ill = false;
  return this.name + ' enjoyed the walk!';
};
dog.play = function () {
  // Set the object's lonely property to false.
  // Return a string of the form:  'pet name loves you.'
  this.lonely = false;
  return this.name + ' loves you.';
};
/*---------------------------------------------------------------------------------------------*/
// Do not modify anything above this line
// New code starts here

// These are the User Interface functions - the 'view'
function updateUI(species) {
  if (species==="dog") {
    document.getElementById('fish').className = document.getElementById('fish').className + 'disappear';
    document.getElementById('adopt').className = document.getElementById('adopt').className + 'hide';
    document.getElementById('feed').className = '';
    document.getElementById('walk').className = '';
    document.getElementById('play').className ='';


  }
  else if (species==="fish") {
    document.getElementById('dog').className = document.getElementById('dog').className + 'disappear';
    document.getElementById('adopt').className = document.getElementById('adopt').className + 'hide';
    document.getElementById('feed').className = '';
    document.getElementById('clean').className = '';
    
  }
}

function updatePetUI(petObject, petSpecies) {
  var petcheck = petObject.check();
  if (petObject.check()) {
    if (petSpecies==='dog') {
          document.getElementById('dog').className = document.getElementById('dog').className = 'move';
    }
    else{
          document.getElementById('fish').className = document.getElementById('fish').className = 'move';

    }
    
  }
  else{
     if (petSpecies==='dog') {
          document.getElementById('dog').className = '';
    }
    else{
          document.getElementById('fish').className = '';
  }
}
}

function changeUIBackground() {
  // Initiate a background change 
  if (document.body.className==='day') {
      document.body.className='night';
  }
  else if (document.body.className==='night') {
    document.body.className='day';}
  
}

// This is the main function - it controls the app logic    
function adopt(event) {
  var myPet;    // this is the adopted pet object.
  var species = event.target.id; // the species of the adopted pet:  fish or dog?
  // Update the data model to reflect the adoption
  if (species === 'dog') {
    myPet = Object.create(dog);  //     
  } else if (species === 'fish') {
    myPet = Object.create(fish); 
  } else {  // enable future enhancements
    myPet = Object.create(pet);        
  }
  // disable further adoptions 
  document.getElementById('choice').removeEventListener('click', adopt, false);
  console.log(myPet);
  // Enter the rest of your code here
  // Upate the UI
  updateUI(species);
  updatePetUI(myPet,species);
  // add an event listener for the action buttons.
  document.getElementById('action').addEventListener('click', (function(event){
    if (event.target.id==='feed') {
    myPet.feed();
    updatePetUI(myPet,species);
  }
  else if (event.target.id==='walk') {
    myPet.walk();
    updatePetUI(myPet,species);
  }
  else if (event.target.id==='play') {
    myPet.play();
    updatePetUI(myPet,species);
  }
  else if (event.target.id==='clean') {
    myPet.clean();
    updatePetUI(myPet,species);

  }
  }), false);
  
  // Schedule a background change
   setInterval(changeUIBackground, 30000);
  // Schedule a new day start
   setInterval(function() {
                      myPet.newDay();
                      updatePetUI(myPet,species);
    }, 60000);
  

}

// main program starts here
// Register the pet adoption event handler on the element with id choice
document.getElementById('choice').addEventListener('click', adopt, false);

