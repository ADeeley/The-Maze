import { Utils } from "./utils/utils";
import { GridModel } from "./models/grid.model";
import { DrawingService } from "./services/drawing.service";

const drawingService = new DrawingService();
const grid = new GridModel(23);

function generator(row: number, col: number) {
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
    /**
     * Main draw loop
     */
	generator(0, 0);
	drawingService.drawGrid(grid);

}
draw();
//setInterval(draw, 10);

