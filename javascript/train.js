

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDok2Ur5CLP8wE4ZO3fM6fm34I6cBSUndw",
    authDomain: "project-d7eba.firebaseapp.com",
    databaseURL: "https://project-d7eba.firebaseio.com",
    projectId: "project-d7eba",
    storageBucket: "project-d7eba.appspot.com",
    messagingSenderId: "716833642114"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train1-name-input").val().trim();
  var trainDestination = $("#destination1-input").val().trim();
  var trainStart = moment($("#first-train1-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrequency = $("#frequency1-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newtrain = {
    trainName: trainName,
    trainDestination: trainDestination,
    trainStart: trainStart,
    trainFrequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newtrain);


  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train1-name-input").val("");
  $("#destination1-input").val("");
  $("#first-train1-input").val("");
  $("#frequency1-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var trainDestination = childSnapshot.val().trainDestination;
  var trainStart = childSnapshot.val().trainStart;
  var trainFrequency = childSnapshot.val().trainFrequency;

 
// Assumptions
    var tFrequency = trainFrequency;

    // 
    var firstTime = trainStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment().format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain+ "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

