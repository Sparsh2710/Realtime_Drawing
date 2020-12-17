noseX = 0;
noseY = 0;
Difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup() {
    canvas = createCanvas(550, 400);
    canvas.position(560, 150);
    video = createCapture(VIDEO);
    video.size(550, 400);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + "NoseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        Difference = leftWristX - rightWristX;
        console.log("leftWristX = " + leftWristX + "rightWristX + " + rightWristX + "Difference = " + Difference);
    }
}

function modelLoaded() {
    console.log("PoseNet Is Intialized");
}

function draw() {
    background('#d0e8f2');

    fill(255, 0, 0);
    stroke(255, 0, 0)
    square(noseX, noseY, Difference);

    document.getElementById("square_sides").innerHTML = "Width and Height = " + Difference +"px ";
}