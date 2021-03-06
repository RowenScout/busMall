'use strict';

//declaring global variables
var i = 0;
var index = 0;
var items = [];
var image = [];
var imageIndex = [];
var round = 0;
var percentClicked = [];
var timesClicked = [];
var names = [];

// a constructor function a lot like the one from Salmon Cookies, but this one
//keeps track of it's index in the items array.
function Item(name, path) {
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicks = 0;
  this.clicksPerShown = 0;
  this.index = index++;
  items.push(this);
  names.push(this.name);
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

//generates a random index for items array and pushes that index into the
//displayItems array.
function randomize() {
  return Math.floor(Math.random() * items.length);
}

//this functions sets the source of our images by refering to their paths via indices.
//it also applies a class to them so that they resize.
function genImages() {
  //first image. Unconventional styling but the linter likes it.
  var random = [];
  random[0] = randomize();
  while (random[0] === imageIndex[0] ||
         random[0] === imageIndex[1] ||
         random[0] === imageIndex[2]) { random[0] = randomize();
  }

  //second image
  random[1] = randomize();
  while (random[1] === random[0] ||
         random[1] === imageIndex[0] ||
         random[1] === imageIndex[1] ||
         random[1] === imageIndex[2]) { random[1] = randomize();
  }

  //third image
  random[2] = randomize();
  while (random[2] === random[0] ||
         random[2] === random[1] ||
         random[2] === imageIndex[0] ||
         random[2] === imageIndex[1] ||
         random[2] === imageIndex[2]) { random[2] = randomize();
  }

  for (i = 0; i < 3; i++) {
    imageIndex[i] = random[i];
    image[i] = document.getElementById(i);
    image[i].setAttribute('src', items[imageIndex[i]].path);
    image[i].setAttribute('class', 'choice');
    image[i].addEventListener('click', handleSelection);
  }
}

var dataSet;

//broken, still working on this

if (localStorage.clicks) {
  var stringData = localStorage.clicks;
  console.log(stringifiedData);

  dataSet = JSON.parse(stringData);
} else {
  dataSet = [];
}

saveStatsToLocalStorage(dataSet);

function saveLocalStorage(clicks) {
  var statsString = JSON.stringify(clicks);
  localStorage.clicks = statsString;
};

//declaring handleSlection. It tracks how many selections the user has made.
//it also tracks how many times each image has been selected, holds my chart,
//and records the number of times each image has been displayed.
function handleSelection(event) {
  items[imageIndex[+event.target.id]].clicks++;
  for (i = 0; i < 2; i++) {
    items[imageIndex[i]].shown++;
  }

  round++;
  if (round === 25) {
    alert('Survey completed!');

    var imgParent = document.querySelector('section');

    for (i = 0; i < 3; i++) {
      imgParent.removeChild(document.getElementById(i));
    }

    //results calculation and display
    for (var i = 0; i < items.length; i++) {
      items[i].clicksPerShown = items[i].clicks / items[i].shown;
      console.log('index ' + i + ' was chosen ' + (items[i].clicksPerShown * 100) + '% of the times it was shown.');
      percentClicked.push(items[i].clicksPerShown);
      timesClicked.push(items[i].clicks);
    }

    //I didn't want to copy/paste the colors into this array so
    //I made a for loop to rotate them for me.
    var barColor = ['cyan', 'purple', 'yellow'];
    for (var o = 0; o < 8; o++) {
      for (var i = 0; i < 3; i++) {
        barColor.push(barColor[i]);
      }
    }

    var context = document.getElementById('my-chart').getContext('2d');
    var myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: 'Number of times clicked',
          data: timesClicked,
          backgroundColor: barColor,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          },]
        },
      },
    });
  }

  var left = 25 - round;
  var results = document.getElementById('results');
  results.textContent = left + ' selections remaining';

  if (round < 25) {
    genImages();
  }
}




//calling our genImages function to give our image tags a source and a class.
genImages();
