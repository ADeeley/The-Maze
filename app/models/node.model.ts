import { ColoursEnum } from "../enums/colours.enum";
import { RectModel } from "./rect.model";

export class NodeModel {
	public x: number;
	public y: number;
	public height: number;
	public width: number;

	constructor(
		private rectModel: RectModel,
		public row: number,
		public col: number,
		public isOpen: boolean = false,
		public colour: ColoursEnum = ColoursEnum.grey
	) {
		this.x = this.rectModel.x;
		this.y = this.rectModel.y;
		this.height = this.rectModel.height;
		this.width = this.rectModel.width;
	}

	public openUp() {
		this.isOpen = true;
	}
}