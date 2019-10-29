import { ColoursEnum } from "../enums/colours.enum";
import { Grid } from "../models/grid.model";
import { NodeModel } from "../models/node.model";

export class DrawingService {
	private borderSize = 2;
	private size = 20;

	constructor(private ctx, private canvas) { }

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

	public drawGrid(grid: Grid): void {
		grid.getGrid.forEach((row: Array<NodeModel>) => {
			row.forEach((node: NodeModel) => node.draw());
		});
		this.drawStartAndEndGoals();
	}
}