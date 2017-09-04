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

var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
alert("submit clicked");
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }
  trainData.ref().push(newTrain);
  alert("train Added!");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;

})

trainData.ref().on("child_added",function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  $("#trainTable>tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})
