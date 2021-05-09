 import {parseCSV} from './Processing.js'
var venuesList = [];
var categories = [];
var output = document.querySelector('#output');
async function  populateVenues(){
 await parseCSV('/paris-restaurant.csv').then(res => venuesList = venuesList.concat(res))
 await parseCSV('/paris-accommodation.csv').then(res => venuesList =venuesList.concat(res))
 await parseCSV('/paris-poi.csv').then(res => venuesList =venuesList.concat(res))
 await  parseCSV('/paris-attraction.csv').then((res) => {venuesList =venuesList.concat(res) })
 let char = "";
    for( let e of venuesList){
        char = char + e.review +" ";
    }
    output.textContent = char;
}

populateVenues();
