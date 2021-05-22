export default class Node {
    neighbours = []
    constructor (id){
        this.id = id
    }
    addNeighbour(node,weight){
        this.neighbours.push({node : node,weight : weight});
    }
}
