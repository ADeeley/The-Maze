// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/utils.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils =
/** @class */
function () {
  function Utils() {}

  Utils.shuffle = function (originalArray) {
    var subjectArray = __spreadArrays(originalArray);

    for (var index = subjectArray.length; index > 0; index--) {
      var randIndex = Math.floor(Math.random() * index);
      var tmpVal = subjectArray[index - 1];
      subjectArray[index - 1] = subjectArray[randIndex];
      subjectArray[randIndex] = tmpVal;
    }

    return subjectArray;
  };

  return Utils;
}();

exports.Utils = Utils;
},{}],"enums/colours.enum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ColoursEnum;

(function (ColoursEnum) {
  ColoursEnum["grey"] = "#37474F";
})(ColoursEnum = exports.ColoursEnum || (exports.ColoursEnum = {}));
},{}],"models/node.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var colours_enum_1 = require("../enums/colours.enum");

var Node =
/** @class */
function () {
  function Node(ctx, x, y, h, w, row, col, isOpen, colour) {
    if (isOpen === void 0) {
      isOpen = false;
    }

    if (colour === void 0) {
      colour = colours_enum_1.ColoursEnum.grey;
    }

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.row = row;
    this.col = col;
    this.isOpen = isOpen;
    this.colour = colour;
  }

  Node.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fillStyle = this.colour;
    this.ctx.fill();
    this.ctx.closePath();
  };

  Node.prototype.openUp = function () {
    /**
     * Opens the node up to be travelled to.
     */
    //this.colour = colours.grey;
    this.isOpen = true;
  };

  return Node;
}();

exports.Node = Node;
},{"../enums/colours.enum":"enums/colours.enum.ts"}],"models/nodes.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var node_model_1 = require("./node.model");

var Nodes =
/** @class */
function () {
  function Nodes(ctx, canvas, n) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.n = n;
    this.x = 2;
    this.y = 2;
    this.nodeSz = 20;
    this.grid = [];
    this.gridSz = n; //Initialise the 2d nodes array

    for (var i = 0; i < this.gridSz; i++) {
      var row = [];

      for (var j = 0; j < this.gridSz; j++) {
        row.push(new node_model_1.Node(ctx, this.x, this.y, this.nodeSz, this.nodeSz, i, j));
        this.x += this.nodeSz + 2;
      }

      this.grid.push(row);
      this.x = 2;
      this.y += this.nodeSz + 2;
    }
  }

  Nodes.prototype.drawStartAndEndNodes = function () {
    // Start node
    this.ctx.beginPath();
    this.ctx.arc(2, 2, this.nodeSz, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.font = "12pt serif";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText("S", 3, 12); // End node

    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width - 2, this.canvas.height - 2, this.nodeSz, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.font = "12pt serif";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText("F", this.canvas.width - 12, this.canvas.height - 3);
  };

  Nodes.prototype.drawAll = function () {
    for (var i = 0; i < this.gridSz; i++) {
      for (var j = 0; j < this.gridSz; j++) {
        this.grid[i][j].draw();
      }
    }

    this.drawStartAndEndNodes();
  };

  Nodes.prototype.getNode = function (row, col) {
    /**
     * returns the node at row, col
     * @row, col : ints
     */
    return this.grid[row][col];
  };

  Nodes.prototype.joinNodes = function (nodeA, nodeB) {
    /**
     * Joins the nodes a and b together visually by merging the two boxes
     * a and b on the canvas.
     * @nodeA, nodeB : Node type objects
     * nodeA and nodeB must be directly adjacent i.e. above,
     * below, left or right.
     */
    if (nodeA.x < nodeB.x) {
      nodeA.w += 2;
    } else if (nodeB.x < nodeA.x) {
      nodeB.w += 2;
    } else if (nodeA.y < nodeB.y) {
      nodeA.h += 2;
    } else if (nodeB.y < nodeA.y) {
      nodeB.h += 2;
    }

    nodeB.openUp();
  };

  Nodes.prototype.getNeighbours = function (row, col) {
    var neighbours = []; //left of node

    if (row > 0) {
      neighbours.push(this.grid[row - 1][col]);
    } //right of node


    if (row < this.gridSz - 1) {
      neighbours.push(this.grid[row + 1][col]);
    } //above node


    if (col > 0) {
      neighbours.push(this.grid[row][col - 1]);
    } //below node


    if (col < this.gridSz - 1) {
      neighbours.push(this.grid[row][col + 1]);
    }

    return neighbours;
  };

  return Nodes;
}();

exports.Nodes = Nodes;
},{"./node.model":"models/node.model.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils/utils");

var nodes_model_1 = require("./models/nodes.model");

var canvas = document.getElementById("mazeCanvas");
var ctx = canvas.getContext("2d");

function generator(row, col) {
  /**
   * Generates a maze by randomly joining this node with one of it's
   * neighbours. This function is then recursively called on the
   * joined node.
   */
  var thisNode = nodes.getNode(row, col);
  var neighbours = nodes.getNeighbours(row, col);
  var shuffledNeighbours = utils_1.Utils.shuffle(neighbours);

  for (var i = 0; i < shuffledNeighbours.length; i++) {
    if (!shuffledNeighbours[i].isOpen) {
      nodes.joinNodes(thisNode, shuffledNeighbours[i]);
      generator(shuffledNeighbours[i].row, shuffledNeighbours[i].col);
    }
  }
}

var nodes = new nodes_model_1.Nodes(ctx, canvas, 23);

var draw = function draw() {
  /**
   * Main draw loop
   */
  generator(0, 0);
  nodes.drawAll();
};

setInterval(draw, 10);
},{"./utils/utils":"utils/utils.ts","./models/nodes.model":"models/nodes.model.ts"}],"../../../../.nvm/versions/node/v11.6.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58270" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v11.6.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map