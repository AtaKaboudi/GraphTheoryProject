import {venue} from './venue.js';

const basePath = '../assets/csv'

function  fetchCSV (path){
    return fetch (basePath + path)
        .then(res => res.text())
        .then((text)=>{
            return text;
        })
        .catch(error=>console.log(error));
}

function getColumnsIndex (columns){
    return [columns.indexOf("id")
    ,columns.indexOf("address")
    ,columns.indexOf('category')
    ,columns.indexOf('lat')
    ,columns.indexOf('lng')
    ,columns.indexOf('location')
    ,columns.indexOf('name')
    ,columns.indexOf('originalId')
    ,columns.indexOf('polarity')
    ,columns.indexOf('subCategory')
    ,columns.indexOf('details')
    ,columns.indexOf('reviews')
]    
}
function populateVenues(textArray,columns){
    let venuesList = [];
    textArray.shift();
    textArray.forEach(element => {
    let params = element.split(",");
    let aux = new venue(params[columns[0]],
        params[columns[1]],
        params[columns[2]],
        params[columns[3]],
        params[columns[4]],
        params[columns[5]],
        params[columns[6]],
        params[columns[7]],
        params[columns[8]],
        params[columns[9]],
        params[columns[10]],
        params[columns[11]],
        params[columns[12]],
    )
    venuesList.push(aux);
});
return venuesList;
}

export function parseCSV(fileName){
return fetchCSV(fileName).then((text)=>{
    let columns = getColumnsIndex(text.split("\n")[0].split(","));
    return( populateVenues(text.split("\n"),columns));
});


}



