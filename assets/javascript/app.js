
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYwr7_U26mDbks2EGiVz_7KXnyPsgjZOM",
    authDomain: "trainscheduler-3779a.firebaseapp.com",
    databaseURL: "https://trainscheduler-3779a.firebaseio.com",
    projectId: "trainscheduler-3779a",
    storageBucket: "",
    messagingSenderId: "88336865845"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

database.ref().on("value", function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
   //  momentjs starts here to get times
       // Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(childSnapshot.val().newArrival, "hh:mm"), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % childSnapshot.val().frequency;
console.log(tRemainder);


// Minute Until Train
var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

       // Add a table row to view data from firebase
       $("tbody").append('<tr><td>' + childSnapshot.val().name +
       '</td><td>' + childSnapshot.val().where + '</td><td>' + childSnapshot.val().frequency +
       '</td><td>' + frequency.format("hh:mm a") + '</td><td>' + newArrival +
       '</td></tr>' );
       console.log(childSnapshot.val());
   }) 
// if (snapshot.child("schedule").exists()) {
   
// $("#schedule").text(snapshot.val().firstTrainTime);

//}

});

// Whenever a user clicks the submit-form button
$("#submit-form").on("click", function(event) {
  alert("working");
   
   // Prevent form submitting prematurely
   event.preventDefault();
   // write variables
   var trainName = $("#trainName-input").val().trim();
   var destination =$("#destination-input").val().trim();
   var firstTrainTime =$("#startTime-input").val().trim();
   var frequency = $("#frequency-inpu").val().trim();
   
   
   var refi = database.ref();
   // this information will show up on firebase
   var data = {
       name: trainName,
       where: destination,
       frequency: frequency,
       newArrival:firstTrainTime
       
   }
// this pushes data to firebase
 refi.push(data);
   console.log(firstTrainTime);
});

  
  