import { Utils } from "./utils/utils";
import { GridModel } from "./models/grid.model";
import { DrawingService } from "./services/drawing.service";

const drawingService = new DrawingService();
const grid = new GridModel(23);

function generator(row: number = 0, col: number = 0) {
    /**
     * Generates a maze by randomly joining this node with one of it's
     * neighbours. This function is then recursively called on the
     * joined node.
     */
	const thisNode = grid.getNode(row, col);
	const neighbours = grid.getNeighbours(row, col);

	const shuffledNeighbours = Utils.shuffle(neighbours);
	for (let i = 0; i < shuffledNeighbours.length; i++) {
		if (!(shuffledNeighbours[i].isOpen)) {
			grid.joinNodes(thisNode, shuffledNeighbours[i]);
			generator(shuffledNeighbours[i].row, shuffledNeighbours[i].col);
		}
	}
}

const draw = function () {
	generator();
	drawingService.drawGrid(grid);

}
draw();

