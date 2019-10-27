import { Utils } from "./utils/utils";
import { Nodes } from "./models/nodes.model";

const canvas = <HTMLCanvasElement> document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");


function generator(row: number, col: number) {
    /**
     * Generates a maze by randomly joining this node with one of it's
     * neighbours. This function is then recursively called on the
     * joined node.
     */
	const thisNode = nodes.getNode(row, col);
	const neighbours = nodes.getNeighbours(row, col);

	const shuffledNeighbours = Utils.shuffle(neighbours);
	for (let i = 0; i < shuffledNeighbours.length; i++) {
		if (!(shuffledNeighbours[i].isOpen)) {
			nodes.joinNodes(thisNode, shuffledNeighbours[i]);
			generator(shuffledNeighbours[i].row, shuffledNeighbours[i].col);
		}
	}
}
var nodes = new Nodes(ctx, canvas, 23);

const draw = function () {
    /**
     * Main draw loop
     */
	generator(0, 0);
	nodes.drawAll();

}
setInterval(draw, 10);

