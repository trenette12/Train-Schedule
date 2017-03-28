//Firebase Initialization//

var config = {
    apiKey: "AIzaSyC1_DjfCRga_AsiaB-dsZt8Lmc10ELfvts",
    authDomain: "dreamer-8cf80.firebaseapp.com",
    databaseURL: "https://dreamer-8cf80.firebaseio.com",
    storageBucket: "dreamer-8cf80.appspot.com",
    messagingSenderId: "154532379776"
  };

firebase.initializeApp(config);

var trainName = "";
var destinationName = "";
var firstTrainTime = "";
var convertedFirstTrain = moment(firstTrainTime).format("HH:mm");
var frequency = "";
var convertedFrequency = moment(frequency, 'm mm'); 
var minutesAway = "";
var convertedMinutesAway = moment().subtract(convertedFirstTrain, "minutes");

var database = firebase.database();


//On click function that adds user input to element id in html document//

$("#add-train").on("click", function(){
	event.preventDefault();
	trainName = $("#train-name").val().trim();
	destinationName = $("#destination-name").val().trim();
	convertedFirstTrain = $("#first-train").val().trim();
	convertedFrequency = $("#frequency").val().trim();
	convertedMinutesAway = $("#minutes-table").val().trim();

//Setting the user input data into the database with assigned properties//
	database.ref().push({
		train: trainName,
		destination: destinationName,
		firsttrain: convertedFirstTrain,
		frequency: convertedFrequency,
		howmanyminutes: convertedMinutesAway,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});


//Taking a snapshot on each child added to the database and adding a row of that data that was received back from that snapshot//
database.ref().on("child_added", function(childSnapshot) {


	$("tbody").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().firsttrain + "</td><td>" + childSnapshot.val().howmanyminutes + "</td></tr>");

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);

});

//The snapshots are ordered by date added//
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

	$("#train-name-table").html(snapshot.val().train);
	$("#destination-table").html(snapshot.val().destination);
	$("#next-arrival-table").html(snapshot.val().firsttrain);
	$("#frequency-table").html(snapshot.val().frequency);
	$("#minutes-table").html(snapshot.val().howmanyminutes);


})


