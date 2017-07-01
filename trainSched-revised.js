// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)


// $(document).ready(function(){
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCE4HZ28EC3S6lglGSasHdYNVujLa1Pzfc",
    authDomain: "employeedata-e808c.firebaseapp.com",
    databaseURL: "https://employeedata-e808c.firebaseio.com",
    storageBucket: "employeedata-e808c.appspot.com",
    messagingSenderId: "256733319903"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#submitButton").on("click", function() {

        // Grabs user input
        // console.log("hello");
        var trainNameInput = $("#trainNameInput").val().trim();
        var destInput = $("#destInput").val().trim();
        var firstTrainUnix = moment($("#firstInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var freqInput = $("#freqInput").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
          name: trainNameInput,
          destination: destInput,
          firstTrain: firstTrainUnix,
          frequency: freqInput
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(firstTrain);
        console.log(newTrain.frequency);

        // Alert
        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#trainNameInput").val("");
        $("#destInput").val("");
        $("#firstInput").val("");
        $("#freqInput").val("");

        // Determine when the next train arrives.
        return false;
     });  

     // 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
     database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());

      // Store everything into a variable.
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;

      // Calculate the minutes until arrival using hardcore math
      // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency.
      var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
      var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
      var tMinutes = tFrequency - tRemainder;

      // To calculate the arrival time, add the tMinutes to the currrent time
      var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

      console.log(tMinutes);
      console.log(tArrival);
      console.log(moment().format("hh:mm A"));
      console.log(tArrival);
      console.log(moment().format("X"));

      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
      + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? ( Let's use our brains first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Let's use our brains first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21
