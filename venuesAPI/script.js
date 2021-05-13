import {populateVenues, venuesList} from './Processing.js'

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
 const  venueAPI = {
     populateVenues(){
        populateVenues().then(()=> {console.log("seeded Venues");});
        setTimeout(()=> {console.log("length VenuesList: "+ venuesList.length)},3000);
    }
    ,
    getRandom : function(limit)  {
        let result = [];
        for( let i= 0 ; i < limit ;i++){
            let index =Math.floor(Math.random()*2);
            result = result.concat(venuesList[index][Math.floor(Math.random()*1000)]);
        }
        return result
    }
    ,
    getRandomCategory : function(category,limit){
        let index  = switchIndex(category) ;
        let result = [];
        for( let i= 0 ; i < limit ;i++){
            result = result.concat(venuesList[index][Math.floor(Math.random()*1000)]);
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


export default venueAPI ;
