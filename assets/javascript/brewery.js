$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
});
currentBrew = localStorage.getItem("brewery")

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
var results;

database.ref('/allBeers/' + currentBrew).on("value", function (snapshot) {
    results = snapshot.val()
    setTable()
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function setTable() {
    var beers = results.beers
    for (var i = 0; i < beers.length; i++) {
        var collHeader = $("<div>").addClass("collapsible-header").attr('id', beers[i].breweryID).text(beers[i].name).attr('href', 'table3.html')
        var colHeaderIcon = $("<i>").addClass("material-icons").html('local_drink')
        collHeader.prepend(colHeaderIcon)
        var beerAbv = $("<span class='row beerinfo'>")
        if (typeof beers[i].abv != 'undefined') {
            beerAbv.text("ABV: " + beers[i].abv + '%')
        }
        else {
            beerAbv.text("ABV: " + beers[i].style.abvMin + '-' + beers[i].style.abvMax + '%')
        }
        var beerIbu = $("<span class='row beerinfo'>")
        if (typeof beers[i].ibu != 'undefined') {
            beerIbu.text("IBU: " + beers[i].ibu)
        }
        else if ((typeof beers[i].style != 'undefined') && (typeof beers[i].style.ibuMin != 'undefined')) {
            beerIbu.text("IBU Scale: " + beers[i].style.ibuMin + '-' + beers[i].style.ibuMax)
        }
        else {
            beerIbu.text("IBU:  - ")
        }
        var beerSrm = $("<span class='row beerinfo'>")
        if (typeof beers[i].srm != 'undefined') {
            beerSrm.text("SRM: " + beers[i].srm)
        }
        else if ((typeof beers[i].style != 'undefined') && (typeof beers[i].style.srmMin != 'undefined')) {
            beerSrm.text("SRM: " + beers[i].style.srmMin + '-' + beers[i].style.srmMax)
        }
        else {
            beerSrm.text("SRM:  - ")
        }
        var collBody = $("<div class='beer-info-body'>").addClass("collapsible-body").append(beerAbv).append(beerIbu).append(beerSrm)
        if (typeof beers[i].style != 'undefined') {
            var beerStyle = $("<span class='row beerinfo'>")
            var stylesBeers = $("<div>").addClass("chip truncate").html(beers[i].style.name + '<img src="../assets/icons/beerTypes.svg"></img>')
            beerStyle.append(stylesBeers)
            collBody.append(beerStyle)
        }
        else if ((typeof beers[i].manualStyle != 'undefined') && (typeof beers[i].manualStyle.name != 'undefined')) {
            var beerStyle = $("<span class='row beerinfo'>")
            var stylesBeers = $("<div>").addClass("chip truncate").html(beers[i].manualStyle.name + '<img src="../assets/icons/beerTypes.svg"></img>')
            beerStyle.append(stylesBeers)
            collBody.append(beerStyle)
        }
        var listItem = $("<li>").append(collHeader).append(collBody)
        $("#beers-coll").append(listItem)
    }
}