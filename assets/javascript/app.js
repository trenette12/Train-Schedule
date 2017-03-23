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
var firstTrainTime = 0;
var frequency = 0;

var database = firebase.database();

$("#add-train").on("click", function(){
	event.preventDefault();
	trainName = $("#train-name").val().trim();
	destinationName = $("#destination-name").val().trim();
	firstTrainTime = $("#first-train").val().trim();
	frequency = $("#frequency").val().trim();

	database.ref().push({
		train: trainName,
		destination: destinationName,
		firsttrain: firstTrainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destinationName);
	console.log(childSnapshot.val().firstTrainTime);
	console.log(childSnapshot.val().frequency);

	$("tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destinationName + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().firstTrainTime + "</td></tr>");

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);

});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

	$("#train-name-table").html(snapshot.val().train);
	$("#destination-table").html(snapshot.val().destination);
	$("#next-arrival-table").html(snapshot.val().firsttrain);
	$("#frequency-table").html(snapshot.val().frequency);


})


