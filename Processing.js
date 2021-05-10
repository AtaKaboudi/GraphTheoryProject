const output = document.getElementById('output')
const basePath = '../assets/csv'
const files = ['/paris-accommodation.csv','/paris-attraction.csv','/paris-poi.csv','/paris-restaurant.csv'];
export const venuesList = [];


function fetchCSV(path){
    return fetch (basePath + path)
        .then(res => res.text())
        .then((text)=>{

            let arr = text.split("\n");
            let valid = [];
            for(let a of arr){
               let  params=  a.split(",");
                if(params.length == 11){
                    valid.push(a);
                }
            }
            return valid;

        })
        .catch(error=>console.log(error));
    }


 export async function populateVenues(){ 
      for(let f of files){
        fetchCSV(f).then((res) =>  {
          
              venuesList.push(res);
            
        });
    }
}


