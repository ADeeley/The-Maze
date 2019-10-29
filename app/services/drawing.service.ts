import { ColoursEnum } from "../enums/colours.enum";
import { GridModel } from "../models/grid.model";
import { NodeModel } from "../models/node.model";

export class DrawingService {
	private borderSize = 2;
	private size = 20;
	private canvas;
	private ctx;

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("mazeCanvas");
		this.ctx = this.canvas.getContext("2d");
	}

	public drawArc(x: number, y: number, size: number): void {
		this.ctx.beginPath();
		this.ctx.arc(
			x,
			y,
			size,
			0,
			2 * Math.PI
		);
		this.ctx.fillStyle = ColoursEnum.white;
		this.ctx.fill();
		this.ctx.closePath();
	}

	public drawStartAndEndGoals(): void {
		// Start node
		this.drawArc(this.borderSize, this.borderSize, this.size);
		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("S", 3, 12);

		// End node
		this.drawArc(
			this.canvas.width - this.borderSize,
			this.canvas.height - this.borderSize,
			this.size
		);
		this.ctx.font = "12pt serif"
		this.ctx.fillStyle = ColoursEnum.black;
		this.ctx.fillText("F", this.canvas.width - 12, this.canvas.height - 3);
	}

	public drawGrid(grid: GridModel): void {
		grid.getGrid.forEach((row: Array<NodeModel>) => {
			row.forEach((node: NodeModel) => this.drawNode(node));
		});
		this.drawStartAndEndGoals();
	}

	public drawNode(node: NodeModel): void {
		this.ctx.beginPath();
		this.ctx.rect(node.x, node.y, node.w, node.h);
		this.ctx.fillStyle = node.colour;
		this.ctx.fill();
		this.ctx.closePath();
	}
}