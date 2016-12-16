$(document).ready(function(){
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

$("#submitButton").on("click", function() {
        console.log("hello");
        var newTrain = $("#trainNameInput").val().trim();
        var newDest = $("#destInput").val().trim();
        var newFirst = $("#firstInput").val().trim();
        var newFreqRate = $("#freqInput").val().trim();
        console.log(newFirst);

            database.ref().push({
                TrainName: newTrain,
                Destination: newDest,
                FirstTrain: newFirst,
                Frequency: newFreqRate
            });

     });  

	// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().TrainName);
      console.log(snapshot.val().Destination);
      console.log(snapshot.val().FirstTrain);
      console.log(snapshot.val().Frequency);

      // Change the HTML to reflect
      $("#name-display").html(snapshot.val().TrainName);
      $("#email-display").html(snapshot.val().Destination);
      $("#age-display").html(snapshot.val().FirstTrain);
      $("#comment-display").html(snapshot.val().Frequency);
     
	// var randomDate = "02/23/1999";
	var randomDate = "02/23/1999";
    var convertedDate = moment(randomDate, "MM/DD/YYYY");
    convertedDate.format("MM/DD/YY")
    convertedDate.toNow()
    moment().diff(convertedDate, "months")

 	//var date1 = new Date("7/13/2010");
	// var date2 = new Date("12/15/2010");
	// var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	// var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	// alert(diffDays);
		return false;	//Stops pg from refreshing
    });