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
    displayCart(container,params[1],params[2],cart.length);
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




function solvePath(){
  //FORMAT INPUT FRO SOLVE.JS
  let input = [];
  cart.forEach((element,index) =>{
    input.push({id:index , lat : element.split(",")[7], long : element.split(",")[8]});
  })
 let result = solve(input);
 console.log(result);
  displayGraph(result)  ;
}

function displayGraph(graph){
  let nodes = [];
  let edges =[];
  graph.nodes.forEach(element =>{
    console.log(element.id);
    nodes.push({id : element.id , label : element.id.toString()})
  })  
  graph.nodes.forEach(element =>{
    element.neighbours.forEach(neighbour =>{
      edges.push({from : element.id , to : neighbour.node.id})
    })
  })



  // create a network
  var container = document.getElementById("myCanva");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    height: '100%',
    width : '100%',
    nodes: {
      shape : 'circle',
      color: {
        border: 'black',
        background :'#122c34'
      },
      font : {
        color :'white',
        size : 20,
      },
      size : 10,
    },
  };
  var network = new vis.Network(container, data, options);
}








