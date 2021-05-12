const venuesContainer = document.getElementById('venuesContainer')
import {displayVenueButton} from '/venueButtonComponent.js'
import venueAPI from './venuesAPI/script.js'

displayVenueButton(venuesContainer,"ata","ibn badiss","43.1","44,2")
venueAPI.populateVenues();
setTimeout(() => {
      var venuesLot=venueAPI.getRandom("restaurant",10);
      venuesLot.forEach((element)=> {
          let params= element.split(",");
        displayVenueButton(venuesContainer,params[1],params[2],params[5],params[7],params[8])
      })
      
}, 3000);