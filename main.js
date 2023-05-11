Webcam.set({
  width:350,
  height:300,
  image_format: 'png',
  png_quality:90
});

cmaera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J1irpwqBc/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "The second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function gotResult(error, results)
{
  if (error) 
  {
   console.error(error); 
  } else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "ok")
    {
        document.getElementById("update_gesture").innerHTML = "👌";
    }
    if(results[0].label == "victory")
    {
        document.getElementById("update_gesture").innerHTML = "✌";
    }
    if(results[0].label == "thumbs up")
    {
        document.getElementById("update_gesture").innerHTML = "👍";
    }
  }
}
  