import { ColoursEnum } from "../enums/colours.enum";
import { RectModel } from "./rect.model";

export class NodeModel {
	public x: number;
	public y: number;
	public h: number;
	public w: number;

	constructor(
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

	public openUp() {
		/**
		 * Opens the node up to be travelled to.
		 */
		this.isOpen = true;
	}
}