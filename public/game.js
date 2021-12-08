import {  update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, updateScore } from "./snake.js"
import {update as updateFood, draw as drawFood} from "./food.js"

// Snake game: JS file - refresh time function Game loop
let lastRenderTime = 0
let gameOver = false
export const gameBoard = document.getElementById("game-board")
export const scoreBoard = document.getElementById("score")


function main (currentTime){
    if (gameOver) {
        if(confirm(`You lost, press ok to restart`)){
            window.location = `http://localhost:5000/snake`
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000

    if (secondSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime
    update()
    draw()
    updateScore(scoreBoard)

}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}
function draw () {
    gameBoard.innerHTML = ``
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = /*outsideGrid(getSnakeHead()) ||*/ snakeIntersection()
}



