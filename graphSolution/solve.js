import PriorityQueue from './priorityQueue.js'
import Graph from './Graph.js'
import Node from './Node.js'
export default function solve(input) {
    return generateGraph(input)
}
let graph = new Graph();

function generateGraph(params) {
    let nodes = [];
    params.forEach(element => {
        nodes.push(new Node(element.id))
    })
    nodes.forEach((element, i) => {
        nodes.forEach((element2, j) => {
            if (i != j) {
                element.addNeighbour(element2, solveWeight(params[i], params[j]));
            }
        })
    })
    graph.addNodes(nodes);
    //START NODE OF INDEX 0
    return diskastra(nodes[0]);

}
/*
    var SF = new Node('SF');
    var Seattle = new Node('Seattle');
    var Idaho = new Node('Idaho');
    var Chicago = new Node('Chicago');
    var NYC = new Node('NYC');
    var graphA = new Graph();
    SF.addNeighbour(Seattle, 3)
    SF.addNeighbour(Idaho, 5);
    Seattle.addNeighbour(Chicago, 2);
    Seattle.addNeighbour(Idaho, 1);
    Chicago.addNeighbour(Idaho, 3)
    Chicago.addNeighbour(Seattle, 2)
    Chicago.addNeighbour(NYC, 4)
    Idaho.addNeighbour(SF, 1);
    Idaho.addNeighbour(Seattle, 1),
        Idaho.addNeighbour(Chicago, 3)
    Idaho.addNeighbour(NYC, 6);
    NYC.addNeighbour(Chicago, 4);
    NYC.addNeighbour(Idaho, 6)
    graphA.addNodes([SF, Seattle, Chicago, Idaho, NYC])
    console.log(diskastra(SF));
    */

function diskastra(startNode) {
    let totalPath = [];
    let prevNode = [];
    let visited = [];
    let minPq = new PriorityQueue;

    totalPath[startNode.id] = 0;
    visited.push(startNode);
    minPq.enqueue(startNode, 1);
    graph.nodes.forEach(element => {
        if (element != startNode) {
            totalPath[element.id] = Infinity;
        }
    })

    while (!minPq.isEmpty()) {

        let minNode = minPq.dequeue().element;
        minNode.neighbours.forEach((neighbour) => {
            if (!visited.includes(neighbour.node)) {
                let altPath = totalPath[minNode.id] + graph.getDistance(minNode, neighbour.node);
                if (altPath < totalPath[neighbour.node.id]) {
                    totalPath[neighbour.node.id] = altPath;
                    prevNode[neighbour.node.id] = minNode;
                    visited.push(minNode)
                    minPq.updatePriority(neighbour.node, altPath);
                }
            }
        })

    }
    let result = [];
    graph.nodes.forEach(node => {
        if (node != startNode) {
            let obj = { node: node, prevNode: prevNode[node.id] };
            result.push(obj);
        }
    })
    return renderResult(result, startNode);
}


function renderResult(res, startNode) {
    let nodes = [];
    res.forEach(element => {
        let a = new Node(element.node.id);
        let b = new Node(element.prevNode.id)
        let indexA = exists(nodes, a);
        let indexB = exists(nodes, b)
        if (indexA < 0) {
            nodes.push(a)
            indexA = nodes.length - 1;
        }
        if (indexB < 0) {
            nodes.push(b);
            indexB = nodes.length - 1;
        }

        let distance = graph.getDistance(element.node, element.prevNode);
        nodes[indexA].addNeighbour(nodes[indexB], distance);
        nodes[indexB].addNeighbour(nodes[indexA], distance);

    })
    let aux = new Graph();
    aux.addNodes(nodes);
    return aux;
}

function exists(nodes, node) {
    let found = -1;
    for (let i = 0; i < nodes.length; i++) {
        if (Object.is(nodes[i].id, node.id)) {
            found = i;
            break;
        }
    }
    return found;
}


function solveWeight(a, b) {
    //returns the  cartesian distance ebetween the coordinates 
    let squarred1 = (Math.pow(Math.abs(a.long - b.long), 2))
    let squarred2 = (Math.pow(Math.abs(a.lat - b.lat), 2))
    return Math.sqrt(squarred1 + squarred2)
}





