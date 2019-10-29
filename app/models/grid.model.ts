import { NodeModel } from "./node.model";
import { RectModel } from "./rect.model";

export class Grid {
	private gridSize: number;
	private nodeSize = 20;
	private grid: Array<Array<NodeModel>> = [];
	private borderSize = 2;

	constructor(private ctx, private canvas, public n: number) {
		this.gridSize = n;
		this.initNodeGrid();
	}

	get getGrid(): Array<Array<NodeModel>> {
		return this.grid;
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

	private fillRow(y, rowNumber): Array<NodeModel> {
		let x = this.borderSize;
		const row: Array<NodeModel> = [];
		const borderedNodeWidth = this.nodeSize + this.borderSize;

		for (let colNumber = 0; colNumber < this.gridSize; colNumber++) {
			const rectModel = new RectModel(x, y, this.nodeSize, this.nodeSize);
			row.push(new NodeModel(this.ctx, rectModel, rowNumber, colNumber));
			x += borderedNodeWidth;
		}
		return row;
	}

	public getNode(row: number, col: number): NodeModel {
		return this.grid[row][col];
	}

	public joinNodes(nodeA: NodeModel, nodeB: NodeModel): void {
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

	public getNeighbours(row: number, col: number): Array<NodeModel> {
		const neighbours: Array<NodeModel> = [];

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