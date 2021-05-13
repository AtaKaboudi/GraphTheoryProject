const venuesContainer = document.getElementById('venuesContainer')
import {displayVenueButton} from '/venueButtonComponent.js'
import venueAPI from './venuesAPI/script.js'
import { displayCart } from './venueCartComponent.js';
var cart =  [];

venueAPI.populateVenues();
setTimeout(() => {

    var venuesLot = venueAPI.getRandom(10);
        displayVenuesBtn(venuesLot)
           // add event listners to add venue to final list when clicked
        addClickedBtnToCartEvent("#venueButton",venuesLot)
     // add event listners to filter buttons parmas{id filterbtn and venuebtn}
        addFilterEvent()

    


    
  },3000)

function validateClickedVenues(){
  var container = document.getElementById('cartWrapper')
    let params = cart.pop().split(",")
    displayCart(container,params[1],params[2]);
}

function displayVenuesBtn(venuesLot){
  venuesLot.forEach((element,i)=> {
    let params= element.split(",");
    displayVenueButton(venuesContainer,params[1],params[2],params[5],params[7],params[8],i)
  })
}
function addClickedBtnToCartEvent(btnDOMId,venuesLot){
  let btnList =document.querySelectorAll(btnDOMId);
  btnList.forEach(element=>{
    element.addEventListener('click',()=>{
     let index = element.getAttribute('value');
     cart.push(venuesLot[index]);
    validateClickedVenues();
   })
  })
}

function addFilterEvent(){
  var filterList = document.querySelectorAll('#filterbtn')
  filterList.forEach(element=>{
     element.onclick = function(){
       //remove current buttons
      var btnList =document.querySelectorAll("#venueButton");
      btnList.forEach(venuebtn =>{
         venuebtn.remove();
       })
       let category = element.getAttribute('value');
       let venuesLot = venueAPI.getRandomCategory(category,10);
       displayVenuesBtn(venuesLot); 
       addClickedBtnToCartEvent('#venueButton',venuesLot)
      }
  })
}
  







