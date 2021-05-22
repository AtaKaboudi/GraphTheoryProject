
export default class Graph {
    constructor () {
        this.nodes = [];
    }
    addNodes (nodesList){
        nodesList.forEach(element => {
            this.nodes.push(element);
        });
    }
    contains(node){
        return this.nodes.includes(node);
    }
    getDistance(nodeA,nodeB){
        let indexA = this.nodes.indexOf(nodeA);
        let indexB = this.nodes.indexOf(nodeB);
        let resultANode ;
        let resultBNode;
      
         this.nodes[indexA].neighbours.forEach( neighbour => {
             if( Object.is(neighbour.node,nodeB)) {
                resultANode =  neighbour.weight;
                }
         })
         this.nodes[indexB].neighbours.forEach( neighbour => {
            if( Object.is(neighbour.node,nodeA)) {
               resultBNode =  neighbour.weight;
               }
        })
        return resultANode || resultBNode
    }
    display(){
        this.nodes.forEach( node => {
            let string = '';
            string += node.id +' : ';
            node.neighbours.forEach(neighbour => {
                string += neighbour.node.id + ' ';
            })
            console.log(string)
        })
    }
}
