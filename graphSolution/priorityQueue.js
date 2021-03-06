
// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}
  
// PriorityQueue class
export default class PriorityQueue {
  
    // An array is used to implement priority
    constructor()
    {
        this.items = [];
    }
    enqueue(element, priority)
    {
        var qElement = new QElement(element, priority);
        var contain = false;
      
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
               
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
      

        if (!contain) {
            this.items.push(qElement);
        }
    }  


    dequeue()
    {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }   

    front()
    {
    
        if (this.isEmpty())
        return "No elements in Queue";
        return this.items[0];
    }
        
    rear()
    {
    
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }
    isEmpty()
    {
        return this.items.length == 0;
    }
    updatePriority(item,priority){
        let index = this.items.indexOf(item);
        if(index = -1 ){
            this.enqueue(item,priority)
            return ;
        }
        this.items[this.items.indexOf(item)].priority = priority;
    }
}