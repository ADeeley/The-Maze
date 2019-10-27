function joinTest() {
	var a = nodes.getNode(2, 2);
	var b = nodes.getNode(2, 1);
	a.openUp()
	b.openUp();
	joinNodes(a, b);
}

function getNeighboursTest() {
	var row = 0;
	var col = 0;
	var n = nodes.getNeighbours(row, col);
	for (var i = 0; i < n.length; i++) {
		console.log("node " + row + " " + col + " " + n[i].x + " " + n[i].y);
	}

}