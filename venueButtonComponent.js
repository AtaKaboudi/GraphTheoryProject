/*template 
    <button>
        <h3>
        <h3>
    <button
    */
 
export function displayVenueButton(DOMElement,n,a,t,lt,lo,index)  {
var name = document.createElement('h3')
name.textContent =n
var address = document.createElement('h3')
address.textContent =a
var type = document.createElement('h3')
type.textContent =t
var lat = document.createElement('h3')
lat.textContent =lt
var long = document.createElement('h3')
long.textContent =lo
var btn = document.createElement('button')
var icon = document.createElement('i')
icon.setAttribute('class','material-icons')
icon.innerHTML = "label_important"
btn.appendChild(name)
btn.appendChild(address)
btn.appendChild(type)
btn.appendChild(lat)
btn.appendChild(long)
btn.appendChild(icon)
btn.setAttribute('value',index)
btn.setAttribute('id','venueButton')
DOMElement.appendChild(btn)
} 