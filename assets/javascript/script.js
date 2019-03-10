
// Link to Firebase Database for viewer tracking

var config = {
    apiKey: "AIzaSyCScSa3985BOl4uiwh4aXfo1ptR3hxTGvY",
    authDomain: "codingbootcampdemo.firebaseapp.com",
    databaseURL: "https://codingbootcampdemo.firebaseio.com",
    projectId: "codingbootcampdemo",
    storageBucket: "codingbootcampdemo.appspot.com",
    messagingSenderId: "489900393317"
  };


  firebase.initializeApp(config);
  
  // --------------------------------------------------------------



  // Create a variable to reference the database.
  var database = firebase.database();

 //Getting text from user
  $("#submit").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var trainName = $("#trainName-text").val().trim();
    var destination = $("#destination-text").val().trim();
    var firstTrainTime = $("#firstTrain-text").val().trim();
    var frequency = $("#frequency-text").val().trim();

    var trainObj = {
        NewTrainName: trainName,
        NewDestination: destination,
        NewFirstTrainTime: firstTrainTime,
        NewFrequency: frequency,
        // reference: function () {
          //   console.log('hi');
        }
        database.ref().push(trainObj);

        //clears text in fields

        $("#trainName-text").val("");
        $("#destination-text").val("");
        $("#firstTrain-text").val("");
        $("#frequency-text").val("");

    })


// Create Firebase event for adding customers to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot){


  // Store everything into a variable.
var customerName = childSnapshot.val().NewTrainName;
var customerDestination = childSnapshot.val().NewDestination;
var customerFrequency = childSnapshot.val().NewFrequency;
var customerTrainTime = childSnapshot.val().NewFirstTrainTime;



//Calculations for times train comes.

var tFrequency = customerFrequency;

// Time set
var firstTime = customerTrainTime;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//console.log(firstTimeConverted);

// // Current Time
 var currentTime = moment();
//console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
 var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
 var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('hh:mm a');
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


//Create the new row

var newRow = $("<tr>").append(
  $("<td>").text(customerName),
  $("<td>").text(customerDestination),
  $("<td>").text(customerFrequency),
  $("<td>").text(nextTrain),
  $("<td>").text(tMinutesTillTrain)


);

//Add the new row
$("#customer-table > tbody").append(newRow);


});