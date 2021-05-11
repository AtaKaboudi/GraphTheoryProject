const main = document.getElementById('main')
import {venueButton} from '/venueButtonComponent.js'
export var venueParams = 'a'

var name = document.createElement('h3')
name.textContent ="name"
var place = document.createElement('h3')
place.textContent ="place"
var btn = document.createElement('button')
btn.appendChild(name)
btn.appendChild(place)
main.appendChild(btn)