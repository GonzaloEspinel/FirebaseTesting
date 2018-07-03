
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYwr7_U26mDbks2EGiVz_7KXnyPsgjZOM",
    authDomain: "trainscheduler-3779a.firebaseapp.com",
    databaseURL: "https://trainscheduler-3779a.firebaseio.com",
    projectId: "trainscheduler-3779a",
    storageBucket: "trainscheduler-3779a.appspot.com",
    messagingSenderId: "88336865845"
  };
  firebase.initializeApp(config);


  $('#formID').validate({ //// initialize the plug
    rules: {
        TrainName: {
            required: true
        },
        Frecuency: {
            required: true
        },
        MilitaryTime: {
            required: true,
        },
        Destination: {
            required: true
        }
    },
    submitHandler: function (form) { 
        event.preventDefault();
        //// Grabs user input
        var trainName = $("#TrainName").val().trim();
        var frecuency = $("#Frecuency").val().trim();
        var militaryTime = $('#MilitaryTime').val().trim();
        var destination = $("#Destination").val().trim();

        console.log("FROM THE FORM INFO:");
        console.log("trainName: " + trainName);
        console.log("frecuency: " + frecuency);
        console.log("militaryTime: " + militaryTime);
        console.log("destination: " + destination);

        //// Creates local "temporary" object for holding employee data
        var NewSchedule = {
          name: trainName,
          freq: frecuency,
          milTime: militaryTime,
          dest: destination
        };

        //// Uploads employee data to the database
        database.ref().push(NewSchedule);

        //// Logs everything to console
        console.log("FROM DB POST INFO:");
        console.log(NewSchedule.name);
        console.log(NewSchedule.freq);
        console.log(NewSchedule.milTime);
        console.log(NewSchedule.dest);

        //// Clears all of the text-boxes
        $("#TrainName").val("");
        $("#Frecuency").val("");
        $("#MilitaryTime").val("");
        $("#Destination").val("");

        alert('valid form submitted'); 
        return false; 
    }
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

//// Store everything into a variable.
var dbTname = childSnapshot.val().name;
var dbFreq = childSnapshot.val().freq;
var dbMilTime = childSnapshot.val().milTime;
var dbDest = childSnapshot.val().dest;

//// Employee Info From DB
console.log("DB INFO:");
console.log("DBNAME: " + dbTname);
console.log("DBFREQUENCTY: " + dbFreq);
console.log("DBMILTIME: " + dbMilTime);
console.log("DBDEST: " + dbDest);

var dbFreqint = parseInt(dbFreq);


// Assumptions

var tFrequency = dbFreqint;

//// Time is 3:30 AM
var firstTime = dbMilTime;

//// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log("HERE: "+firstTimeConverted);

//// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

//// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));


//// Add each train's data into the table
$("table > tbody").append("<tr><td>" + dbTname + "</td><td>" + dbDest + "</td><td>" +
dbFreq + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});
  