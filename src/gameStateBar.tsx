// comments are what WAS JSX and turned into TSX
// ----------
// import React from "react";
import * as React from 'react'
import { GameState } from "./constants";

interface GameStateBarState {
    gameState: GameState;
}

// export class GameStateBar extends React.Component {
export class GameStateBar extends React.Component<{},GameStateBarState>{

    // constructor(props) {
    constructor(props: {}) {
        super(props);
        this.state = {gameState: ""};
    }

    // handleGameStateChange(e) {
    handleGameStateChange(e:CustomEvent) {
        this.setState({gameState: e.detail});
    }

    // handleRestart(e) {
    handleRestart(e:Event) {
        this.setState({gameState: ""});
    }

    componentDidMount() {
        // window.addEventListener("gameStateChange", e => this.handleGameStateChange(e));
        window.addEventListener("gameStateChange", (e: CustomEvent) => this.handleGameStateChange(e));
        // window.addEventListener("restart", e => this.handleRestart(e));
        window.addEventListener("restart", (e: CustomEvent) => this.handleRestart(e));
    }

    componentWillUnmount() {
        // window.removeEventListener("gameStateChange", e => this.handleGameStateChange(e));
        window.removeEventListener("gameStateChange", (e: CustomEvent) => this.handleGameStateChange(e));
        // window.removeEventListener("restart", e => this.handleRestart(e));
        window.removeEventListener("restart", (e: CustomEvent) => this.handleRestart(e));

    }

    render() {
        return (
            <div className="gameStateBar"> {this.state.gameState} </div>
        )
    }
}
