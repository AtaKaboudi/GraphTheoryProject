import PriorityQueue from './priorityQueue.js'
var arr= [['a',1,2],['b',2,3],['c',4,5],['d',1,9],['e',7,2],['f',2,8]];

class Node {
    neighbours = []
    constructor (id){
        this.id = id
    }
    addNeighbour(node,weight){
        this.neighbours.push({node : node,weight : weight});
    }
}
class Graph {
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


var SF = new Node ('SF');
var Seattle = new Node('Seattle');
var Idaho = new Node('Idaho');
var Chicago = new Node('Chicago');
var NYC = new Node('NYC');
var graph = new Graph();
SF.addNeighbour(Seattle,3)
SF.addNeighbour(Idaho,5);
Seattle.addNeighbour(Chicago,2);
Seattle.addNeighbour(Idaho,1);
Chicago.addNeighbour(Idaho,3)
Chicago.addNeighbour(Seattle,2)
Chicago.addNeighbour(NYC,4)
Idaho.addNeighbour(SF,1);
Idaho.addNeighbour(Seattle,1),
Idaho.addNeighbour(Chicago,3)
Idaho.addNeighbour(NYC,6);
NYC.addNeighbour(Chicago,4);
NYC.addNeighbour(Idaho,6)
graph.addNodes([SF,Seattle,Chicago,Idaho,NYC])

function algo (sf){
    let totalPath = [];
    let prevNode  = [];
    let visited = [];
    let minPq = new PriorityQueue;

    totalPath[SF.id]= 0;
    visited.push(SF);
    minPq.enqueue(SF,1);
        graph.nodes.forEach(element =>{
            if(element != SF){
            totalPath[element.id]= Infinity;
            }
        })

       while(!minPq.isEmpty()){
        
            let minNode = minPq.dequeue().element;
            minNode.neighbours.forEach((neighbour) => {
                if(!visited.includes(neighbour.node)){
                    let altPath = totalPath[minNode.id] + graph.getDistance(minNode,neighbour.node);
                    if(altPath < totalPath[neighbour.node.id]){
                        totalPath[neighbour.node.id] = altPath;
                        prevNode[neighbour.node.id] = minNode;
                        visited.push(minNode)
                        minPq.updatePriority(neighbour.node,altPath);
                    }
                }

            })
            
           }
           let result = [];
           graph.nodes.forEach(node =>{
               if (node != SF) {
            let obj = { id :node.id , prev :prevNode[node.id].id , weight: totalPath[node.id]};
                result.push(obj);
         }
        })
        console.log(result);
        return renderResult(result,SF);
    }

console.log(algo());

    function renderResult(res,startNode){
   
    }
    function getNextIndex(result,current){
        let i =-1
        result.forEach((element,index) =>{
            if(element.prev == current.id){
                i = index;
            }
        })
        return i ;
    }

function generateGraph(params){
    for(let i = 0 ; i<params.length-1; i++) {
        for(let j= i+1 ; j< params.length ;j++){
            graph.addNode(i);
            graph.addEdge(i,j,solveWeight(params[i],params[j]));
        }
    }
}
function solveWeight(a,b){
    //returns the  cartesian distance ebetween the coordinates 
    let squarred1= (Math.pow(Math.abs(a[1]-b[1]),2))
    let squarred2= (Math.pow(Math.abs(a[2]-b[2]),2))
    return Math.sqrt(squarred1+squarred2)
}

function solvePath(graph){
    console.log(graph.djikstraAlgorithm(1));

}



