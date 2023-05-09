let mobilenet;
let classifier;
let video;
let itslabel = 'test';
let recyclableBtn;
let nonRecyclBtn;
let backgroundBtn;
let trainBtn;
let saveBtn;


function modelReady() {
  console.log('Model is ready!!!');
  // classifier.load('./model/model.json', customModelReady);
}

// function customModelReady() {
//   console.log('Custom Model is ready!!!');
// }

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss === null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    itslabel = results[0].label;
    classifier.classify(gotResults);
  }

}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  recyclableBtn = createButton('Recyclable');
  recyclableBtn.mousePressed(function() {
    classifier.addImage('Recyclable');
  });

  nonRecyclBtn = createButton('Non-Recyclable');
  nonRecyclBtn.mousePressed(function() {
    classifier.addImage('Non-Recyclable');
  });
 
  // backgroundBtn = createButton('Background');
  // backgroundBtn.mousePressed(function() {
  //   classifier.addImage('Background');
  // });

  trainBtn = createButton('Train classifier');
  trainBtn.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveBtn = createButton('Save Model');
  saveBtn.mousePressed(function() {
    classifier.save();
  });
}

function draw() {
  background(0); 
  image(video, 0, 0, 640, 450);
  fill(255);
  textSize(16);
  text(itslabel, 10, height - 10);
}



