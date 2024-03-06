// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/'
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/f8wVS5QYV/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let position
let size = 50;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  position = createVector(width/2, height/2);
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  ellipse(position.x, position.y, size, size),

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  
  // if up, then move ball up, else if down, move ball down. else (neutral), ball stays in place.
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!

  if (label == "UP") {
    position.y = position.y - 1;
  } else if (label == "DOWN") {
    position.y = position.y + 1;
  }

  if(position.y > height + size/2 || position.y < -size/2) {
    // position.x = width/2;
    // position.y = height/2;
    position = createVector(width/2, height/2);
  }

  // if (position.y 320, 260){
  //  then position.y(0,0);
  // }

  classifyVideo();
}