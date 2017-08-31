var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

var colours = {
    STEEL_GREY : "#85929E",
    LIGHT_GREY : "#ECF0F1" 
}

function Node(x, y, s) {
    this.x  = x;
    this.y  = y;
    this.sz = s;

    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.sz, this.sz);
        ctx.fillStyle = colours.STEEL_GREY; 
        ctx.fill();
        ctx.closePath();
    }
}


function Nodes(n) {
    this.x     = 2;
    this.y     = 2;
    this.sz  = 20; 
    this.nodes = [];

    //Initialise the 2d nodes array
    for (var i = 0; i < n; i++) {
        var row = [];
        for (var j = 0; j < n; j++) {
            row.push(new Node(this.x, this.y, this.sz));
            this.x += this.sz + 2;
        }
        this.nodes.push(row);
        this.x = 2;
        this.y += this.sz + 2;
    }

    this.drawAll = function() {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                this.nodes[i][j].draw();
            }
        }
    }
}

var nodes = new Nodes(23);

draw = function() {
    nodes.drawAll();
}
setInterval(draw, 10);

