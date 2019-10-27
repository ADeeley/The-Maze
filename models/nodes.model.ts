import { Node } from "./node.model";

export class Nodes {
	private x = 2;
	private y = 2;
	private gridSz: number;
	private nodeSz = 20;
	private grid = [];

	constructor(private ctx, private canvas, public n: number) {
		this.gridSz = n

		//Initialise the 2d nodes array
		for (var i = 0; i < this.gridSz; i++) {
			var row = [];
			for (var j = 0; j < this.gridSz; j++) {
				row.push(new Node(ctx, this.x, this.y, this.nodeSz, this.nodeSz, i, j));
				this.x += this.nodeSz + 2;
			}
			this.grid.push(row);
			this.x = 2;
			this.y += this.nodeSz + 2;
		}
	}

	public drawStartAndEndNodes() {
		// Start node
		this.ctx.beginPath();
		this.ctx.arc(2, 2, this.nodeSz, 0, 2 * Math.PI);
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = "#000000";
		this.ctx.fillText("S", 3, 12);

		// End node
		this.ctx.beginPath();
		this.ctx.arc(this.canvas.width - 2, this.canvas.height - 2, this.nodeSz, 0, 2 * Math.PI);
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = "#000000";
		this.ctx.fillText("F", this.canvas.width - 12, this.canvas.height - 3);
	}


	public drawAll() {
		for (var i = 0; i < this.gridSz; i++) {
			for (var j = 0; j < this.gridSz; j++) {
				this.grid[i][j].draw();
			}
		}
		this.drawStartAndEndNodes();
	}

	public getNode(row, col) {
		/**
		 * returns the node at row, col
		 * @row, col : ints
		 */
		return this.grid[row][col];
	}

	public joinNodes(nodeA, nodeB) {
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

	public getNeighbours(row: number, col: number): Array<any> {
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