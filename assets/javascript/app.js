// Changes DOM with Materialize
$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
});

var config = {
  apiKey: "AIzaSyCACl0dIADoUYtr0cU0l6WsUMGbcHhC3Vo",
  authDomain: "project1-388e6.firebaseapp.com",
  databaseURL: "https://project1-388e6.firebaseio.com",
  projectId: "project1-388e6",
  storageBucket: "project1-388e6.appspot.com",
  messagingSenderId: "62443097997"
};

firebase.initializeApp(config);

var database = firebase.database();
var breweriesATX;

// Firebase watcher + initial loader HINT: .on("value")
database.ref('/beersBlueOwl').on("value", function (snapshot) {
  var results = snapshot.val()
  for (var i = 0; i < results.length; i++) {
    var showBeers = $("<div>");
    //gets the rating from giphy data and puts it in a p tag
    var beerName = results[i].name;
    var p = $("<ul>").html(beerName);
    showBeers.append(p);
    $("#Beer-info").append(showBeers)
}
  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref('/breweriesAustin').on("value", function (snapshotBreweries) {
  breweriesATX = snapshotBreweries.val()
  for (var i = 0; i < breweriesATX.length; i++) {
    var showBrewery = $("<div>");
    var breweryname = breweriesATX[i].brewery.name;
    var p = $("<ul>").html(breweryname);
    showBrewery.append(p);
    $("#Brewery-info").append(showBrewery)
  };


  console.log(snapshotBreweries.val());
  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
