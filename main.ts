import { Utils } from "./utils/utils";

var canvas = document.getElementById("mazeCanvas");
var ctx = canvas.getContext("2d");

enum colours {
	grey = '#37474F',
}

function Node(x, y, h, w, r, c) {
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.row = r;
	this.col = c;
	this.isOpen = false;
	this.colour = colours.grey;

	this.draw = function () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = this.colour;
		ctx.fill();
		ctx.closePath();
	}

	this.openUp = function () {
        /**
         * Opens the node up to be travelled to.
         */
		this.colour = colours.grey;
		this.isOpen = true;
	}
}

function Nodes(n) {
	this.x = 2;
	this.y = 2;
	this.gridSz = n;
	this.nodeSz = 20;
	this.grid = [];

	//Initialise the 2d nodes array
	for (var i = 0; i < this.gridSz; i++) {
		var row = [];
		for (var j = 0; j < this.gridSz; j++) {
			row.push(new Node(this.x, this.y, this.nodeSz, this.nodeSz, i, j));
			this.x += this.nodeSz + 2;
		}
		this.grid.push(row);
		this.x = 2;
		this.y += this.nodeSz + 2;
	}

	this.drawStartAndEndNodes = function () {
		// Start node
		ctx.beginPath();
		ctx.arc(2, 2, this.nodeSz, 0, 2 * Math.PI);
		ctx.fillStyle = "#ffffff";
		ctx.fill();
		ctx.closePath();

		ctx.font = "12pt serif"
		ctx.fillStyle = "#000000";
		ctx.fillText("S", 3, 12);

		// End node
		ctx.beginPath();
		ctx.arc(canvas.width - 2, canvas.height - 2, this.nodeSz, 0, 2 * Math.PI);
		ctx.fillStyle = "#ffffff";
		ctx.fill();
		ctx.closePath();

		ctx.font = "12pt serif"
		ctx.fillStyle = "#000000";
		ctx.fillText("F", canvas.width - 12, canvas.height - 3);
	}


	this.drawAll = function () {
		for (var i = 0; i < this.gridSz; i++) {
			for (var j = 0; j < this.gridSz; j++) {
				this.grid[i][j].draw();
			}
		}
		this.drawStartAndEndNodes();
	}

	this.getNode = function (row, col) {
        /**
         * returns the node at row, col
         * @row, col : ints
         */
		return this.grid[row][col];
	}

	this.joinNodes = function (nodeA, nodeB) {
		/**
		 * Joins the nodes a and b together visually by merging the two boxes
		 * a and b on the canvas.
		 * @nodeA, nodeB : Node type objects
		 * nodeA and nodeB must be directly adjacent i.e. above,
		 * below, left or right.
		 */
		if (nodeA.x < nodeB.x) {
			nodeA.w += 2;
		}
		else if (nodeB.x < nodeA.x) {
			nodeB.w += 2;
		}
		else if (nodeA.y < nodeB.y) {
			nodeA.h += 2;
		}
		else if (nodeB.y < nodeA.y) {
			nodeB.h += 2;
		}
		nodeB.openUp();
	}

	this.getNeighbours = function (row, col) {
        /**
         * returns an array of nodes which are the node at row, col's neighbours.
         * @row, col - indicies for the location of the node in grid.
         */
		var neighbours = [];

		//left of node
		if (row > 0) {
			neighbours.push(this.grid[row - 1][col]);
		}
		//right of node
		if (row < this.gridSz - 1) {
			neighbours.push(this.grid[row + 1][col]);
		}
		//above node
		if (col > 0) {
			neighbours.push(this.grid[row][col - 1]);
		}
		//below node
		if (col < this.gridSz - 1) {
			neighbours.push(this.grid[row][col + 1]);
		}

		return neighbours;
	}
}

function generator(row, col) {
    /**
     * Generates a maze by randomly joining this node with one of it's
     * neighbours. This function is then recursively called on the
     * joined node.
     * @row, col : integers representing the node's location in the grid
     */
	var thisNode = nodes.getNode(row, col);
	var neighbours = nodes.getNeighbours(row, col);

	neighbours = Utils.shuffle(neighbours);
	for (var i = 0; i < neighbours.length; i++) {
		if (!(neighbours[i].isOpen)) {
			nodes.joinNodes(thisNode, neighbours[i]);
			generator(neighbours[i].row, neighbours[i].col);
		}
	}
}
var nodes = new Nodes(23);

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

const draw = function () {
    /**
     * Main draw loop
     */
	generator(0, 0);
	nodes.drawAll();

}
setInterval(draw, 10);

