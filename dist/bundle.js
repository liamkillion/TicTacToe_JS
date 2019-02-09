/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import React from "react";

// import { playerCell, aiCell } from "./constants";

// export class Board extends React.Component {
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    // constructor(props) {
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.getInitState();
        return _this;
    }
    Board.prototype.getInitState = function () {
        var cells = Array.apply(null, Array(9)).map(function () { return ""; });
        return { cells: cells, gameState: "" };
    };
    Board.prototype.resetState = function () {
        this.setState(this.getInitState());
    };
    Board.prototype.componentDidMount = function () {
        var _this = this;
        window.addEventListener("restart", function () { return _this.resetState(); });
    };
    Board.prototype.componentWillUnmount = function () {
        var _this = this;
        window.removeEventListener("restart", function () { return _this.resetState(); });
    };
    // Fire a global event notifying GameState changes
    Board.prototype.handleGameStateChange = function (newState) {
        var event = new CustomEvent("gameStateChange", { "detail": this.state.gameState });
        event.initEvent("gameStateChange", false, true);
        window.dispatchEvent(event);
    };
    // check the game state - use the latest move
    // checkGameState(cells, latestPos, latestVal) {
    Board.prototype.checkGameState = function (cells, latestPos, latestVal) {
        if (this.state.gameState !== "") {
            return this.state.gameState;
        }
        // check row
        var result = this.check3Cells(cells, 3 * Math.floor(latestPos / 3), 3 * Math.floor(latestPos / 3) + 1, 3 * Math.floor(latestPos / 3) + 2);
        if (result) {
            return result;
        }
        // check col
        result = this.check3Cells(cells, latestPos % 3, latestPos % 3 + 3, latestPos % 3 + 6);
        if (result) {
            return result;
        }
        // check diag
        result = this.check3Cells(cells, 0, 4, 8);
        if (result) {
            return result;
        }
        result = this.check3Cells(cells, 2, 4, 6);
        if (result) {
            return result;
        }
        // check draw - if all cells are filled
        if (this.findAllEmptyCells(cells).length === 0) {
            return "Draw";
        }
        return "";
    };
    // check if 3 cells have same non-empty val - return the winner state; otherwise undefined
    // check3Cells(cells, pos0, pos1, pos2) {
    Board.prototype.check3Cells = function (cells, pos0, pos1, pos2) {
        if (cells[pos0] === cells[pos1] &&
            cells[pos1] === cells[pos2] &&
            cells[pos0] !== "") {
            if (cells[pos0] === "X") {
                return "X Wins!";
            }
            return "O Wins!";
        }
        else {
            return undefined;
        }
    };
    // list all empty cell positions
    // findAllEmptyCells(cells) {
    Board.prototype.findAllEmptyCells = function (cells) {
        return cells.map(function (v, i) {
            if (v === "") {
                return i;
            }
            else {
                return -1;
            }
        }).filter(function (v) { return v !== -1; });
    };
    // make a move
    // move(pos, val, callback)
    Board.prototype.move = function (pos, val, callback) {
        var _this = this;
        if (this.state.gameState === "" &&
            this.state.cells[pos] === "") {
            var newCells = this.state.cells.slice();
            newCells[pos] = val;
            var oldState_1 = this.state.gameState;
            this.setState({ cells: newCells, gameState: this.checkGameState(newCells, pos, val) }, function () {
                if (_this.state.gameState !== oldState_1) {
                    _this.handleGameStateChange(_this.state.gameState);
                }
                if (callback) {
                    callback.call(_this);
                }
            });
        }
    };
    // handle a new move from player
    // handleNewPlayerMove(pos) {
    Board.prototype.handleNewPlayerMove = function (pos) {
        var _this = this;
        this.move(pos, __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* playerCell */], function () {
            // AI make a random move following player's move
            var emptyCells = _this.findAllEmptyCells(_this.state.cells);
            var pos = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            _this.move(pos, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* aiCell */]);
        });
    };
    Board.prototype.render = function () {
        var _this = this;
        var cells = this.state.cells.map(function (v, i) {
            return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { key: i, pos: i, val: v, handleMove: function () { return _this.handleNewPlayerMove(i); } }));
        });
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "board" }, cells));
    };
    return Board;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

// class Cell extends React.Component {
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // position of cell to className
    // posToClassName(pos) {
    Cell.prototype.posToClassName = function (pos) {
        var className = "cell";
        switch (Math.floor(pos / 3)) {
            case 0:
                className += " top";
                break;
            case 2:
                className += " bottom";
                break;
            default: break;
        }
        switch (pos % 3) {
            case 0:
                className += " left";
                break;
            case 2:
                className += " right";
                break;
            default:
                break;
        }
        return className;
    };
    // handleClick(e) {
    Cell.prototype.handleClick = function (e) {
        this.props.handleMove();
    };
    Cell.prototype.render = function () {
        var _this = this;
        var name = this.props.val;
        if (this.props.val === "") {
            name = "";
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this.posToClassName(this.props.pos), onClick: function (e) { return _this.handleClick(e); } },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: name },
                " ",
                this.props.val,
                " "));
    };
    return Cell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameStateBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// comments are what WAS JSX and turned into TSX
// ----------
// import React from "react";

// export class GameStateBar extends React.Component {
var GameStateBar = /** @class */ (function (_super) {
    __extends(GameStateBar, _super);
    // constructor(props) {
    function GameStateBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { gameState: "" };
        return _this;
    }
    // handleGameStateChange(e) {
    GameStateBar.prototype.handleGameStateChange = function (e) {
        this.setState({ gameState: e.detail });
    };
    // handleRestart(e) {
    GameStateBar.prototype.handleRestart = function (e) {
        this.setState({ gameState: "" });
    };
    GameStateBar.prototype.componentDidMount = function () {
        var _this = this;
        // window.addEventListener("gameStateChange", e => this.handleGameStateChange(e));
        window.addEventListener("gameStateChange", function (e) { return _this.handleGameStateChange(e); });
        // window.addEventListener("restart", e => this.handleRestart(e));
        window.addEventListener("restart", function (e) { return _this.handleRestart(e); });
    };
    GameStateBar.prototype.componentWillUnmount = function () {
        var _this = this;
        // window.removeEventListener("gameStateChange", e => this.handleGameStateChange(e));
        window.removeEventListener("gameStateChange", function (e) { return _this.handleGameStateChange(e); });
        // window.removeEventListener("restart", e => this.handleRestart(e));
        window.removeEventListener("restart", function (e) { return _this.handleRestart(e); });
    };
    GameStateBar.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "gameStateBar" },
            " ",
            this.state.gameState,
            " "));
    };
    return GameStateBar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestartBtn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import React from "react";

// export class RestartBtn extends React.Component {
var RestartBtn = /** @class */ (function (_super) {
    __extends(RestartBtn, _super);
    function RestartBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Fire a global event notifying restart of game
    // handleClick(e) {
    RestartBtn.prototype.handleClick = function (e) {
        var event = document.createEvent("Event");
        event.initEvent("restart", false, true);
        window.dispatchEvent(event);
    };
    RestartBtn.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#", className: "restartBtn", onClick: function (e) { return _this.handleClick(e); } }, "Restart");
    };
    return RestartBtn;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restartBtn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameStateBar__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "app" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__board__["a" /* Board */], null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "description t1" }, " Player(X) "),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "description t2" }, " Computer(O) ")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__restartBtn__["a" /* RestartBtn */], null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__gameStateBar__["a" /* GameStateBar */], null)));
    };
    return App;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](App, null), document.getElementById("content"));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return playerCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return aiCell; });
var playerCell = "X";
var aiCell = "O";


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map