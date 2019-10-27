import { Node } from "./node.model";
import { RectModel } from "./rect.model";
import { ColoursEnum } from "../enums/colours.enum";

export class Nodes {
	private gridSize: number;
	private nodeSize = 20;
	private grid: Array<Array<Node>> = [];
	private borderSize = 2;

	constructor(private ctx, private canvas, public n: number) {
		this.gridSize = n;
		this.initNodeGrid();
	}

	private initNodeGrid(): void {
		let y = this.borderSize;
		const borderedNodeWidth = this.nodeSize + this.borderSize;

		for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
			const row = this.fillRow(y, rowNumber);
			this.grid.push(row);
			y += borderedNodeWidth;
		}
	}

	private fillRow(y, rowNumber): Array<Node> {
		let x = this.borderSize;
		const row: Array<Node> = [];
		const borderedNodeWidth = this.nodeSize + this.borderSize;

		for (let colNumber = 0; colNumber < this.gridSize; colNumber++) {
			const rectModel = new RectModel(x, y, this.nodeSize, this.nodeSize);
			row.push(new Node(this.ctx, rectModel, rowNumber, colNumber));
			x += borderedNodeWidth;
		}
		return row;
	}

	private drawArc(x: number, y: number): void {
		this.ctx.beginPath();
		this.ctx.arc(
			x,
			y,
			this.nodeSize,
			0,
			2 * Math.PI
		);
		this.ctx.fillStyle = ColoursEnum.white;
		this.ctx.fill();
		this.ctx.closePath();
	}

	public drawStartAndEndNodes(): void {
		// Start node
		this.drawArc(this.borderSize, this.borderSize);
		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("S", 3, 12);

		// End node
		this.drawArc(this.canvas.width - this.borderSize, this.canvas.height - this.borderSize);
		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("F", this.canvas.width - 12, this.canvas.height - 3);
	}


	public drawAll(): void {
		this.grid.forEach((row: Array<Node>) => {
			row.forEach((node: Node) => node.draw());
		});
		this.drawStartAndEndNodes();
	}

	public getNode(row: number, col: number): Node {
		return this.grid[row][col];
	}

	public joinNodes(nodeA: Node, nodeB: Node): void {
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
		const neighbours: Array<Node> = [];

		//left of node
		if (row > 0) {
			neighbours.push(this.grid[row - 1][col]);
		}
		//right of node
		if (row < this.gridSize - 1) {
			neighbours.push(this.grid[row + 1][col]);
		}
		//above node
		if (col > 0) {
			neighbours.push(this.grid[row][col - 1]);
		}
		//below node
		if (col < this.gridSize - 1) {
			neighbours.push(this.grid[row][col + 1]);
		}

		return neighbours;
	}
}