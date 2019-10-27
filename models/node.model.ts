import { ColoursEnum } from "../enums/colours.enum";

export class Node {
	constructor(
		private ctx,
		public x: number,
		public y: number,
		public h: number,
		public w: number,
		public row: number,
		public col: number,
		public isOpen: boolean = false,
		public colour: ColoursEnum = ColoursEnum.grey
	) {
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