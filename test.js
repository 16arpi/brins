import Brin from './index.js'

function randomOrderedGraph() {
    var edges = [
        ['C', 'A'],
        ['D', 'C'],
        ['B', 'C'],
        ['B', 'A'],
    ]
    var order = edges.sort((a, b) => 0.5 - Math.random());
    var graph = new Brin(4, 4);
    order.forEach(edge => {
        var a, b;
        [a, b] = edge;
        graph.addEdge(a, b);
    })
    return graph
}

var graph = randomOrderedGraph();

// All true
console.log(graph.hasEdge('C', 'A'))
console.log(graph.hasEdge('D', 'C'))
console.log(graph.hasEdge('B', 'C'))
console.log(graph.hasEdge('B', 'A'))

// All false
console.log(graph.hasEdge('A', 'C'))
console.log(graph.hasEdge('C', 'D'))
console.log(graph.hasEdge('C', 'B'))
console.log(graph.hasEdge('A', 'B'))

// Constant neighbors list
console.log(graph.neighborsList())
