let mobilenet;
let classifier;
let video;
let itslabel = 'loading model...';

function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('./model/model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'Model is Ready!';
  classifier.classify(gotResults);
}

function videoReady() {
  console.log('Video is ready!!!');
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
  createCanvas(640, 490);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
}

function draw() {
  background(0); 
  image(video, 0, 0, 640, 450);
  fill(255);
  textSize(24);
  text(itslabel, 10, height - 10);
}



