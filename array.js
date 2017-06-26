'use strict';

var index = 0;
var allItems = [];
var imageIndex = [];
var displayItems = [];

function Item(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.shown = 0;
  this.index = index++;
  allItems.push(this);
}

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

var img1 = document.getElementById('one');
var img2 = document.getElementById('two');
var img3 = document.getElementById('three');

//generates a random image from our allItems array
function random() {
  var index = Math.floor(Math.random() * allItems.length);
  if (displayItems.indexOf(index) > 0) {
    index = Math.floor(Math.random() * allItems.length);
  } else {
    displayItems.push(index);
  }

  return index;
}

function rand3() {
  imageIndex[0] = random();
  img1.setAttribute('src', allItems[imageIndex[0]].path);
  img1.setAttribute('class', 'choice');

  imageIndex[1] = random();
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = random();
  }

  img2.setAttribute('src', allItems[imageIndex[1]].path);
  img2.setAttribute('class', 'choice');

  imageIndex[2] = random();
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = random();
  }

  img3.setAttribute('src', allItems[imageIndex[2]].path);
  img3.setAttribute('class', 'choice');

  console.log(imageIndex[0]);
  console.log(imageIndex[1]);
  console.log(imageIndex[2]);
}

rand3();
