import { ColoursEnum } from "../enums/colours.enum";
import { RectModel } from "./rect.model";

export class Node {
	public x: number;
	public y: number;
	public h: number;
	public w: number;

	constructor(
		public ctx,
		private rectModel: RectModel,
		public row: number,
		public col: number,
		public isOpen: boolean = false,
		public colour: ColoursEnum = ColoursEnum.grey
	) {
		this.x = this.rectModel.x;
		this.y = this.rectModel.y;
		this.h = this.rectModel.height;
		this.w = this.rectModel.width;
	}

	public draw() {
		this.ctx.beginPath();
		this.ctx.rect(this.x, this.y, this.w, this.h);
		this.ctx.fillStyle = this.colour;
		this.ctx.fill();
		this.ctx.closePath();
	}

	public openUp() {
		/**
		 * Opens the node up to be travelled to.
		 */
		//this.colour = colours.grey;
		this.isOpen = true;
	}
}