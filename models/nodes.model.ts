import { Node } from "./node.model";
import { RectModel } from "./rect.model";
import { ColoursEnum } from "../enums/colours.enum";

export class Nodes {
	private gridSz: number;
	private nodeSz = 20;
	private grid = [];
	private borderSize = 2;

	constructor(private ctx, private canvas, public n: number) {
		this.gridSz = n;
		this.initNodeGrid();
	}

	private initNodeGrid() {
		let x = this.borderSize;
		let y = this.borderSize;

		for (let i = 0; i < this.gridSz; i++) {
			const row = this.fillRow(x, y, i);
			this.grid.push(row);
			x = this.borderSize;
			y += (this.nodeSz + this.borderSize);
		}
	}

	private fillRow(x, y, i): Array<Node> {
		const row = [];
		for (let j = 0; j < this.gridSz; j++) {
			const rectModel = new RectModel(x, y, this.nodeSz, this.nodeSz);
			row.push(new Node(this.ctx, rectModel, i, j));
			x += (this.nodeSz + this.borderSize);
		}
		return row;
	}

	public drawStartAndEndNodes(): void {
		// Start node
		this.ctx.beginPath();
		this.ctx.arc(2, 2, this.nodeSz, 0, 2 * Math.PI);
		this.ctx.fillStyle = ColoursEnum.white;
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("S", 3, 12);

		// End node
		this.ctx.beginPath();
		this.ctx.arc(
			this.canvas.width - this.borderSize,
			this.canvas.height - this.borderSize,
			this.nodeSz, 0,
			2 * Math.PI
		);
		this.ctx.fillStyle = ColoursEnum.white;
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("F", this.canvas.width - 12, this.canvas.height - 3);
	}


	public drawAll(): void {
		for (let i = 0; i < this.gridSz; i++) {
			for (let j = 0; j < this.gridSz; j++) {
				this.grid[i][j].draw();
			}
		}
		this.drawStartAndEndNodes();
	}

	public getNode(row: number, col: number): Node {
		return this.grid[row][col];
	}

	public joinNodes(nodeA, nodeB): void {
		/**
		 * Joins the nodes a and b together visually by merging the two boxes
		 * a and b on the canvas.
		 * @nodeA, nodeB : Node type objects
		 * nodeA and nodeB must be directly adjacent i.e. above,
		 * below, left or right.
		 */
		if (nodeA.x < nodeB.x) {
			nodeA.w += this.borderSize;
		}
		else if (nodeB.x < nodeA.x) {
			nodeB.w += this.borderSize;
		}
		else if (nodeA.y < nodeB.y) {
			nodeA.h += this.borderSize;
		}
		else if (nodeB.y < nodeA.y) {
			nodeB.h += this.borderSize;
		}
		nodeB.openUp();
	}

	public getNeighbours(row: number, col: number): Array<Node> {
		const neighbours = [];

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