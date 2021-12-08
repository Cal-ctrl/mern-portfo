import {onSnake, expandSnake} from "./snake.js"
import {randomGridPosition} from "./grid.js"
export let food = {}
import {gameBoard} from "./game.js"

let EXPASION_RATE = 1


export function update(){
    if (onSnake(food)){
        expandSnake(EXPASION_RATE)
        food = {}
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement)
}
// For traditional snake game 
// function getNewFoodPostion () {
//     let newFoodPosition
//     while (newFoodPosition == null || onSnake(newFoodPosition)) {
//         newFoodPosition = randomGridPosition()
//     }
//     return newFoodPosition
// }

let mousePositionOnBoard = {x: 0, y: 0}
let newFoodPosition = {}

window.addEventListener("click", e => {
    const gameBoardBounds = gameBoard.getBoundingClientRect()
    const boardStart = gameBoardBounds.x
    const gamePiecewidth = gameBoardBounds.width / 21

    mousePositionOnBoard = {x: e.pageX - boardStart, y: e.pageY}
    // Creating a new food position using relative game board bounds pixels and mapping to CSS grid
    newFoodPosition = {x: Math.floor(mousePositionOnBoard.x / gamePiecewidth) + 1, y: Math.floor(mousePositionOnBoard.y  /gamePiecewidth) + 1 }
    food = newFoodPosition

})


