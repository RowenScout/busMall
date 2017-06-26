'use strict';

//declaring global variables
var index = 0;
var items = [];
var i = 0;


var imageIndex = [];

//this array contains our currently displayed items
var displayItems = [];

//current number of selections the user has made
var round = 0;

// a constructor function a lot like the one from Salmon Cookies, but this one
//keeps track of it's index in the items array.
function Item(name, path) {
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicks = 0;
  this.index = index++;
  items.push(this);
}

//creating all of our items using the object constructor. I really wanted
//to declare a prototype before here but wasn't sure how to incorporate that
//into the code without things getting bogged down.
new Item('bag', 'assets/bag.jpg');
new Item('banana', 'assets/banana.jpg');
new Item('bathroom', 'assets/bathroom.jpg');
new Item('boots', 'assets/boots.jpg');
new Item('breakfast', 'assets/breakfast.jpg');
new Item('bubblegum', 'assets/bubblegum.jpg');
new Item('chair', 'assets/chair.jpg');
new Item('cthulhu', 'assets/cthulhu.jpg');
new Item('dog-duck', 'assets/dog-duck.jpg');
new Item('dragon', 'assets/dragon.jpg');
new Item('pen', 'assets/pen.jpg');
new Item('scissors', 'assets/scissors.jpg');
new Item('shark', 'assets/shark.jpg');
new Item('pet-sweep', 'assets/pet-sweep.jpg');
new Item('sweep', 'assets/sweep.png');
new Item('tauntaun', 'assets/tauntaun.jpg');
new Item('unicorn', 'assets/unicorn.jpg');
new Item('usb', 'assets/usb.gif');
new Item('watercan', 'assets/water-can.jpg');
new Item('wineglass', 'assets/wine-glass.jpg');

// grabbing the ID of our image elements and assigning them to declared variables
//I used the 0, 1, 2 naming scheme so that the ID can refer to the item's position
//in an array. See line 114
var image1 = document.getElementById('0');
var image2 = document.getElementById('1');
var image3 = document.getElementById('2');

//generates a random index for items array and pushes that index into the
//displayItems array.
function random() {
  var index = Math.floor(Math.random() * items.length);
  if (displayItems.indexOf(index) > 0) {
    index = Math.floor(Math.random() * items.length);
  } else {
    displayItems.push(index);
  }

  return index;
}

//this functions sets the source of our images by refering to their paths via indices.
//it also applies a class to them so that they resize.
//for the 2nd and 3rd images a comparison generates new numbers if there is any
//duplication
function genImages() {
  imageIndex[0] = random();
  image1.setAttribute('src', items[imageIndex[0]].path);
  image1.setAttribute('class', 'choice');

  imageIndex[1] = random();
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = random();
  }

  image2.setAttribute('src', items[imageIndex[1]].path);
  image2.setAttribute('class', 'choice');

  imageIndex[2] = random();
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = random();
  }

  image3.setAttribute('src', items[imageIndex[2]].path);
  image3.setAttribute('class', 'choice');

  console.log(imageIndex[0]);
  console.log(imageIndex[1]);
  console.log(imageIndex[2]);
}

//calling out rand3 function which gives our image tags a source and a class.
genImages();

//adding an event listener for each displayed image which calls handleSelection on click
image1.addEventListener('click', handleSelection);
image2.addEventListener('click', handleSelection);
image3.addEventListener('click', handleSelection);

//declaring handleSlection. It tracks how many selections the user has made.
//it also tracks how many times each image has been selected
//as well as the number of times each image has been displayed.
function handleSelection() {
  items[imageIndex[+event.target.id]].clicks++;
  for (i = 0; i < 2; i++) {
    items[imageIndex[i]].numDisplays++;
  }

  round++;
  if (round === 25) {
    alert('Survey completed!');
  }

  var left = 25 - round;
  alert(left + ' Selection(s) remaining.');
  genImages();
}
