export function displayCart(DOMElement,n,cat,index) {

   let cart= document.createElement('div');
    cart.setAttribute('id','cart')
    let nb = document.createElement('span');
    nb.innerText=index
    let name= document.createElement('h1')
    name.innerText= n;
    let category= document.createElement('h3')
    category.innerText= cat;
    cart.appendChild(nb);
    cart.appendChild(name);
    cart.appendChild(category);
    DOMElement.appendChild(cart);

}
