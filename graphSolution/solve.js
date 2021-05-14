
var arr= [['a',1,2],['b',2,3],['c',4,5]];
var graph = [];

class edge {
    constructor (id,weight,nodes){
        this.weight= weight
        this.nodes=nodes;
    }
}
generateGraph(arr);
function generateGraph(params){
    for(let i = 0 ; i<params.length-1; i++) {
        for(let j= i+1 ; j< params.length ;j++){
            let weight = solveWeight(params[i],params[j])
            let Edge =new edge (weight,[params[i],params[j]]);
            graph.push(Edge);
        }
    }
    console.log(graph);
}
function solveWeight(a,b){
    //returns the  cartesian distance ebetween the coordinates 
    let squarred1= (Math.pow(Math.abs(a[1]-b[1]),2))
    let squarred2= (Math.pow(Math.abs(a[2]-b[2]),2))
    return Math.sqrt(squarred1+squarred2)
}
/*
 node : 
    id
    edges : [[id, weight]] 
*/