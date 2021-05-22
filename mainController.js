const venuesContainer = document.getElementById('venuesContainer')
import {displayVenueButton} from '/venueButtonComponent.js'
import venueAPI from './venuesAPI/script.js'
import { displayCart } from './venueCartComponent.js';
import solve from './graphSolution/solve.js'
var cart =  [];

venueAPI.populateVenues();
setTimeout(() => {
    var venuesLot = venueAPI.getRandom(10);
        displayVenuesBtn(venuesLot)
        // add event listners to add venue to final list when clicked
        addClickedBtnToCartEvent("#venueButton",venuesLot)
        // add event listners to filter buttons parmas{id filterbtn and venuebtn}
        addFilterEvent()
        //Add eventListners to search and Confirm Cart
        let input = document.querySelector('#searchInput');
        input.addEventListener('keyup',(event)=>{
          if(event.keyCode ==13){
            searchVenues(input.value);
          }
        });
        let confirmBtn = document.querySelector('#confirmbtn');
        confirmBtn.onclick = function (){
          solvePath();
        }

  },3000)

function searchVenues(key){
  let venuesList= venueAPI.getName(key);
  if(venuesList.length == 0) venuesList= ["1,NO MATCHES FOUND"]
  console.log(venuesList);
  let venuesBtn = document.querySelectorAll('#venueButton');
  removeBtn("#venueButton")
  displayVenuesBtn(venuesList);
  addClickedBtnToCartEvent("#venueButton",venuesList);
}

function validateClickedVenues(){
  var container = document.getElementById('cartWrapper')
    let params = cart[cart.length-1].split(",")
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
function removeBtn(btnId){
   var btnList =document.querySelectorAll(btnId);
   btnList.forEach(venuebtn =>{
      venuebtn.remove();
    })
}

function addFilterEvent(){
  var filterList = document.querySelectorAll('#filterbtn')
  filterList.forEach(element=>{
     element.onclick = function(){
        removeBtn('#venueButton');
       let category = element.getAttribute('value');
       let venuesLot = venueAPI.getRandomCategory(category,10);
       displayVenuesBtn(venuesLot); 
       addClickedBtnToCartEvent('#venueButton',venuesLot)
      }
  })
}
  cart =[ "232605,\"Hoteliere ANOU 1\",\"00094 Rue des Archives, Paris, France\",accommodation,Paris,48.863463,2.360867,http://tour-pedia.org/api/getPlaceDetails?id=232605,http://tour-pedia.org/api/getReviewsByPlaceId?placeId=232605\r"
,"85829,\"Ambassade de Belgique\",\"9 Rue de Tilsitt, Paris, France\",poi,Paris,48.875089,2.2944,http://tour-pedia.org/api/getPlaceDetails?id=85829,http://tour-pedia.org/api/getReviewsByPlaceId?placeId=85829\r"
,"91135,\"Woh Marie-Laurent\",\"205 Rue de Tolbiac, Paris, France\",poi,Paris,48.825619,2.348464,http://tour-pedia.org/api/getPlaceDetails?id=91135,http://tour-pedia.org/api/getReviewsByPlaceId?placeId=91135\r"
]
solvePath();
function solvePath(){
  //FORMAT INPUT FRO SOLVE.JS
  let input = [];
  cart.forEach((element,index) =>{
    input.push({id:index , lat : element.split(",")[7], long : element.split(",")[8]});
  })
 let result = solve(input);
  displayGraph(result)  ;
}

function displayGraph(graph){
  let canvas = document.getElementById("myCanva");
  let ctx = canvas.getContext("2d")
  ctx.beginPath();
  ctx.arc(100,100,30,0,180,false);
  ctx.strokeStylr ="black"
  ctx.fill();
}







