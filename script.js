import {populateVenues, venuesList} from './Processing.js'
var output = document.getElementById('output')

// wait to  populate venues in List 
 function switchIndex(category){
    let index ;
    switch(category){
        case "restaurant":
            index = 3 ;
            break; 
        case "poi":
            index = 2 ;
            break; 
        case "attraction":
            index = 1 ;
            break; 
        case "accommodation":
            index = 0 ;
            break;
        }
        return index ;
 }
export const venueAPI = {
    populateVenues(){
        populateVenues().then(()=>console.log("a"));
    }
    ,
    getrandom(category,limit)  {
        let index  = switchIndex(category) ;
        if(!index) return ["Wrong category"]
        let result = [];
        for( let i= 0 ; i < limit ;i++){
            result = result.concat(venuesList[index][1000]);
        }
        return result
    }
    ,
    getName(category,keyWord){
        let result = []
        let index  = switchIndex(category) ;
        if ((!index) || (!keyWord)) return ["Wrong Arguments"]

        for(let v of venuesList[index]){
           let name = v.split(",")[1];
            if(name.includes(" " +keyWord+ " ")){
                result = result.concat(v);
            }
        }
        return result;
    }

}

venueAPI.populateVenues();
setTimeout(()=> {console.log(venueAPI.getName("restaurant","italien"))},3000);
