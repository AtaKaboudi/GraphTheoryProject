import {venueParams} from './mainController.js'
export  class venueButton extends HTMLElement {
    constructor(){
        super()
        this.innerHTML = `<h3>${this.getAttribute('name')}</h3>`
    }
}